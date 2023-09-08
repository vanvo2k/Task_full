import React, {Component} from "react";
import {connect} from "react-redux";
import ItemsExplorer from "./ItemsExplorer";
import EnsureLoggedInContainer from "../../../shared-containers/EnsureLoggedInContainer";
import CanUseFeatureContainer from "../../../shared-containers/CanUseFeatureContainer";
import {fetchItems, fetchTotalItems, receiveProducts} from "../actions";
import DocTitle from "../../../shared-components/DocTitle";
import { _getItemsData } from "../selectors";
import { toggleUpgradePopup } from "../actions";

class ItemsExplorerContainer extends Component {
    shouldComponentUpdate(prevProps, prevState) {
        if(prevProps.itemData.get("isOpenUpgradePopup")!==this.props.itemData.get("isOpenUpgradePopup")){
            return true;
        }
        else{
        return false;}
    }

    render() {
        const {props} = this;

        return (
            <EnsureLoggedInContainer>
                <DocTitle title="Search items">
                    <CanUseFeatureContainer
                        demoImage="search.jpg"
                        feature={'getItems'} alternatively='all'>
                        <ItemsExplorer {...props}/>
                    </CanUseFeatureContainer>
                </DocTitle>
            </EnsureLoggedInContainer>
        );
    }
}

const mapStateToProps = (state, props) => ({
    itemData: _getItemsData(state)
});

const mapDispatchToProps = {
    receiveProducts,
    fetchItems,
    fetchTotalItems,
    toggleUpgradePopup,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsExplorerContainer);