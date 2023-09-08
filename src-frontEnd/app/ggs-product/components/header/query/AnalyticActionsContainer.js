import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getFullMetaData} from "../../../selectors";
import AnalyticActions from "./AnalyticActions";
import {changeQuery} from "../../../analyticActions";

class AnalyticActionsContainer extends Component {
    render() {
        return <AnalyticActions {...this.props} />
    }
}

const mapStateToProps = (state, props) => ({
    query: getFullMetaData(state),
});

const mapDispatchToProps = {
    changeQuery
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnalyticActionsContainer));