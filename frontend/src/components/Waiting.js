import React, { Component } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import "../styles/util.css";

export default class Waiting extends Component {

render() {
    return (
        <div>
            <CircularProgress/>
        </div>
    );
}

}