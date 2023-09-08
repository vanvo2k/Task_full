import React, {Component} from "react";
import {connect} from "react-redux";
import TrendItems from "./TrendItems";
import EnsureLoggedInContainer from "../../../shared-containers/EnsureLoggedInContainer";
import CanUseFeatureContainer from "../../../shared-containers/CanUseFeatureContainer";
import {fetchItems, fetchTotalItems} from "../actions";
import DocTitle from "../../../shared-components/DocTitle";

class TrendItemsContainer extends Component {
    render() {
        const {props} = this;

        return (
            <EnsureLoggedInContainer>
                <DocTitle title="Trend items">
                    <CanUseFeatureContainer
                        demoImage="trends.jpg"
                        feature='super-private'>
                        <TrendItems {...props}/>
                    </CanUseFeatureContainer>
                </DocTitle>
            </EnsureLoggedInContainer>
        );
    }
}

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = {
    fetchItems,
    fetchTotalItems
};

export default connect(mapStateToProps, mapDispatchToProps)(TrendItemsContainer);