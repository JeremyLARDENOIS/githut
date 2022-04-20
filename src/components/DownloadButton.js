import MaterialButton from "react-materialize/lib/Button";
import { useState } from "react";

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
                            <MaterialButton className={className} style={styleLinkedButtonLeft} download="./data/data-csv.zip"> In CSV </MaterialButton>
                            <MaterialButton className={className} style={styleLinkedButtonRight} download="./data/data-csv.zip"> In JSON </MaterialButton>
                        </center>
                    )}
                </div>
            </div>
        </div>
    )
}