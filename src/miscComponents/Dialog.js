import React, { Component } from "react";
import { Dialog, DialogActions } from "@material-ui/core";
import Button from "./Button";
import { noop, isWhiteOrUndefined, isWhite } from "../miscFunctions";

const sizes = ["large", "medium", "small", "no-padding"];

class CustomDialog extends Component {
    render() {
        let {
            onClose,
            maxwidth,
            open,
            textColor,
            closebutton,
            size,
            backgroundColor,
            blackBackground
        } = this.props;

        if (!sizes.includes(size)) size = "large";

        return (
            <Dialog
                open={!!open}
                maxWidth={maxwidth ? maxwidth : false}
                onClose={onClose ? onClose : noop}
                classes={{
                    paper:
                        isWhiteOrUndefined(textColor) && !isWhite(backgroundColor)
                            ? "background-primary-black-dark-important"
                            : blackBackground
                            ? "background-black-deep-dark-important"
                            : ""
                }}
            >
                <div className={`dialog-margins ${size}`}>{this.props.children}</div>
                {closebutton ? (
                    <DialogActions>
                        <Button variant="text" onClick={onClose}>
                            CLOSE
                        </Button>
                    </DialogActions>
                ) : null}
            </Dialog>
        );
    }
}

export default CustomDialog;
