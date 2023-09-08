import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchRemoveMyAnalytic} from "../actions";
import MyAnalytic from "./MyAnalytic";

class MyAnalyticContainer extends Component {
    render() {
        const {props} = this;

        return (
            <MyAnalytic {...props}/>
        );
    }
}

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = {
    fetchRemoveMyAnalytic
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAnalyticContainer);