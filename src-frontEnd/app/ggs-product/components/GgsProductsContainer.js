import React, {Component} from "react";
import {connect} from "react-redux";
import EnsureLoggedInContainer from "../../../shared-containers/EnsureLoggedInContainer";
import CanUseFeatureContainer from "../../../shared-containers/CanUseFeatureContainer";
import {fetchItems, fetchTotalItems, receiveProducts} from "../actions";
import DocTitle from "../../../shared-components/DocTitle";
import GgsProducts from "./GgsProducts";

class GgsProductsContainer extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const {props} = this;

        return (
            <EnsureLoggedInContainer>
                <DocTitle title="Search GGS items">
                    <CanUseFeatureContainer
                        demoImage="search.jpg"
                        feature={'ggs-user'} alternatively={'admin'}>
                        <GgsProducts {...props}/>
                    </CanUseFeatureContainer>
                </DocTitle>
            </EnsureLoggedInContainer>
        );
    }
}

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = {
    receiveProducts,
    fetchItems,
    fetchTotalItems
};

export default connect(mapStateToProps, mapDispatchToProps)(GgsProductsContainer);