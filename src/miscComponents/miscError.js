import React, { Component } from "react";
import { goTo } from "../miscFunctions";
import Button from "./Button";

class MiscError extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        // TODO: include a fun picture in here
        return (
            <div className="center fillScreen">
                <div className="font24px" style={{ margin: "30px" }}>
                    Whoops
                </div>
                <div>
                    Yikes, something went wrong. Our bad!<br />
                    Try refreshing or email us at support@moonshotinsights.io
                </div>
                <Button style={{ margin: "20px" }} onClick={() => goTo("/myEvaluations")}>
                    Take Me Home
                </Button>
            </div>
        );
    }
}

export default MiscError;
