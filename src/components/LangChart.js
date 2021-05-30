/**
 * Programming language popularity chart based on Highcharts
 * Please note that this file is dual licensed since Highcharts
 * is licensed under CC BY-NC 3.0
 * If Highcharts gets replaced in the future this class
 * will be licensed under AGPL-3.0 only
 * @author Fabian Beuke <mail@beuke.org>
 * @license AGPL-3.0 everything except Highcharts
 * @license CC BY-NC 3.0 Highcharts
 * @see {@link https://creativecommons.org/licenses/by-nc/3.0/}
 */

import { useState, useEffect } from "react";
import { update, range, sortBy, includes, uniqBy, reject } from "lodash/fp"
import { size, max, flatten, map, take, zipWith, divide } from "lodash/fp"
import { unzip, sum, filter, drop, isEqual, pipe } from "lodash/fp"
import _ from "lodash"
import ChartConfig from "common/LangChartConfig"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import GitHubColors from "github-colors"

export default function LangChart(props) {

    const [state, setState] = useState(ChartConfig)
    const [debounce] = useState(() => _.debounce(setState, 200))
    let dataLength = 0
    let visible
    const style = {
        margin: "auto",
        maxWidth: "100%",
    }

    /**
     * Creates Highcharts xAxis categories since 2012
     * quarter wise: 2012/Q1, 2012/Q2, ...
     * @returns {Object} xAxis categories (year/quarter)
     */
    function categories() {
        return pipe(
            map((y) => map((q) => (q === 1 ? y : "")), range(1, 5)),
            flatten,
            drop(1)
        )(range(2012, 2050))
    }

    /**
     * Calculates relative / percentage of series data
     * Example: Pull Request -> JavaScript 22.2%, C# 4%, ..
     * @param {Object} current - GitHub api data set
     * @returns {Object} Data series with percentage data
     */
    function percentageData(data) {
        const total = pipe(map("data"), unzip, map(sum))(data)
        const zipTotal = (x) => zipWith(divide, x)(total)
        const zipData = pipe(update("data"))(zipTotal)
        return map(zipData, data)
    }

    /**
     * Adds zeros if we dont have enough historical data. For example,
     * there is no data for Typescript in 2012/Q2.
     * @param {Object} current - GitHub api data set
     * @returns {Object} Data series filled with zeros if required
     */
    function fillZeros(data) {
        const HistSize = pipe(map("data"), map(size), max)(data)
        const fill = (d) => new Array(HistSize - size(d)).fill(0).concat(d)
        return map(update("data", fill))(data)
    }

    /**
     * Creates a data series for highcharts based on GitHub raw api data
     * Filters top 10 languages
     * @param {Object} current - GitHub api data set
     * @returns {Object} Data series for top 10 languages
     */
    const createSeries = (top) => (data) => {
        return pipe(
            uniqBy("name"),
            reject((o) => !includes(o.name)(top)),
            map.convert({ cap: 0 })((d, i) => ({
                name: d.name,
                color: GitHubColors.get(d.name)
                    ? GitHubColors.get(d.name).color // or random color
                    : "#" + Math.floor(Math.random() * 16777215).toString(16),
                visible: visible ? visible.includes(d.name) : i < 7,
                data: map("count")(filter({ name: d.name })(data)),
            })),
            fillZeros
        )(data)
    }

    /*
     * Updates react state if state has changed
     */
    function updateState(newState) {
        if (!isEqual(state, newState)) {
            debounce(newState)
        }
    }

    /*
     * Creates a new percentage series of data
     */
    function createSeriesPercentage(data, top) {
        return pipe(
            map(update("count")(Math.floor)),
            createSeries(top),
            percentageData
        )(data)
    }

    /**
     * Creates a new chart if state has changed
     */
    function constructChart(data, title, top) {
        if (data.length === dataLength && size(top) === 0) {
            return
        }

        dataLength = data.length
        const newState = {
            ...state,
            yAxis: {
                ...state.yAxis,
                title: { text: title },
            },
            series: createSeriesPercentage(data, top),
            xAxis: { tickLength: 0, categories: categories() },
        }
        updateState(newState)
    }

    /**
     * Native react function, called on component mount and
     * on every prop change event
     */
    useEffect(() => {
        const { lang } = props.match.params
        visible = lang ? lang.split(",") : undefined
        const [store, _] = props.store
        const data = store.data
        const title = store.name
        const top = pipe(
            take(50),
            sortBy("name"),
            map("name")
        )(props.table[0].data)
        constructChart(data, title, top)
    }, [props.hist, props.store, props.table])

    if (state && state.series && state.series.length === 0) return null
    return (
        <center>
            <div style={style}>
                <HighchartsReact highcharts={Highcharts} options={state} />
            </div>
        </center>
    )
}