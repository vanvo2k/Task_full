import React, {Component} from "react";
import {connect} from "react-redux";
import ItemsExplorer from "./ItemsExplorer";
import EnsureLoggedInContainer from "../../../shared-containers/EnsureLoggedInContainer";
import CanUseFeatureContainer from "../../../shared-containers/CanUseFeatureContainer";
import {fetchItems, receiveProducts} from "../actions";
import DocTitle from "../../../shared-components/DocTitle";

class HistoricalArchiveContainer extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const {props} = this;

        return (
            <EnsureLoggedInContainer>
                <DocTitle title="Search items">
                    <CanUseFeatureContainer
                        demoImage="search.jpg"
                        feature='getItems' alternatively='all' page='historical-archive'>
                        <ItemsExplorer {...props}/>
                    </CanUseFeatureContainer>
                </DocTitle>
            </EnsureLoggedInContainer>
        );
    }
}

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = {
    receiveProducts,
    fetchItems
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoricalArchiveContainer);