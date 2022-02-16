import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

const makeTheme = color => createMuiTheme({ palette: { primary: { main: color } } });

const style = {
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.18)",
    textTransform: "none"
};

export default ({ to, color, text, onClick }) => (
    <MuiThemeProvider theme={makeTheme(color)}>
        <Button variant="outlined" color="primary" style={style} onClick={onClick}>
            {text}
        </Button>
    </MuiThemeProvider>
);
