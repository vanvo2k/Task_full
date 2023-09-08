import React, {Component} from "react";
import {connect} from "react-redux";
import PageNotFound from "./PageNotFound";
import DocTitle from "../../../shared-components/DocTitle";

class PageNotFoundContainer extends Component {
    render() {
        const {props} = this.props;

        return (
            <DocTitle title="Page not found">
                <PageNotFound {...props}/>
            </DocTitle>
        );
    }
}

export default connect()(PageNotFoundContainer);