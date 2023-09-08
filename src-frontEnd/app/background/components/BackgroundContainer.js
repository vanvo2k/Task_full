import React, {Component} from "react";
import Background from "./Background";

class BackgroundContainer extends Component {
    render() {
        const {props} = this;

        return <Background {...props}/>
    }
}

export default BackgroundContainer;