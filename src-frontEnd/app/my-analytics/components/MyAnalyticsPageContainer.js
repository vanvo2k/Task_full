import React, {Component} from "react";
import {connect} from "react-redux";
import MyAnalyticsPage from "./MyAnalyticsPage";
import {fetchListMyAnalytics} from "../actions";
import DocTitle from "../../../shared-components/DocTitle";
import {getListItems, getLoading} from "../selectors";

class MyAnalyticsPageContainer extends Component {
    render() {
        const {props} = this;

        return (
            <DocTitle title="My Analytics">
                <MyAnalyticsPage {...props}/>
            </DocTitle>
        );
    }
}

const mapStateToProps = (state, props) => ({
    loading: getLoading(state),
    items: getListItems(state)
});

const mapDispatchToProps = {
    fetchListMyAnalytics
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAnalyticsPageContainer);