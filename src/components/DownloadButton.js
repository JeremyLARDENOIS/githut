import MaterialButton from "react-materialize/lib/Button";
import { useState } from "react";
import pullRequests from "data/gh-pull-request.json"
import issueEvent from "data/gh-issue-event.json"
import pushEvent from "data/gh-push-event.json"
import licenses from "data/github-licenses.json"
import starEvent from "data/gh-star-event.json"
import { saveAs } from 'file-saver';
import JSZip from 'jszip'

export default function DownloadButton({ _match, _store, _history }) {
    const className = "waves-effect waves-light blue-grey darken-1";

    const [hasBeenClicked, setHasBeenClicked] = useState(false);

    const style = {
        padding: "0.5rem",
        margin: "0.5rem",
    };

    function displayChoices() {
        setHasBeenClicked(true);
    }

    const styleLinkedButtonLeft = {
        borderTopRightRadius: "0",
        borderBottomRightRadius: "0",
    }
    const styleLinkedButtonRight = {
        borderBottomLeftRadius: "0",
        borderTopLeftRadius: "0",
    }
    
    const jsonFiles = {
        "gh-issue-event.json": issueEvent,
        "gh-push-event.json": pushEvent,
        "github-licenses.json": licenses,
        "gh-pull-request.json": pullRequests,
        "gh-star-event.json": starEvent
    }

    const downloadJSONZip = () => {
        const zipJson = new JSZip();
        for (const [filename, file] of Object.entries(jsonFiles)) {
            zipJson.file(filename, [file])
        }
        // download("githut-json.zip", zipJson)
        zipJson.generateAsync({type:"blob"})
            .then(function(content) {
                // see FileSaver.js
                saveAs(content, "githut-json.zip");
            });

    }

    return (
        <div>
            <div className="row" style={style}>
                <div className="col s12">
                    {!hasBeenClicked ? (
                        <center>
                            <MaterialButton className={className} onClick={displayChoices}> Download Data </MaterialButton>
                        </center>
                    ) : (
                        <center>
                            <MaterialButton className={className} style={styleLinkedButtonLeft} onClick={downloadJSONZip}> In JSON </MaterialButton>
                            <MaterialButton className={className} style={styleLinkedButtonRight}> In CSV </MaterialButton>
                        </center>
                    )}
                </div>
            </div>
        </div>
    )
}