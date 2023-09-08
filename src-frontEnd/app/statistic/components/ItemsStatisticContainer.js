import React, {Component} from "react";
import {connect} from "react-redux";
import ItemsStatistic from "./ItemsStatistic";
import DocTitle from "../../../shared-components/DocTitle";
import EnsureLoggedInContainer from "../../../shared-containers/EnsureLoggedInContainer";
import CanUseFeatureContainer from "../../../shared-containers/CanUseFeatureContainer";

class ItemsStatisticContainer extends Component {
    render() {
        const {props} = this;

        return (
            <EnsureLoggedInContainer>
                <DocTitle title="Statistic items">
                    <CanUseFeatureContainer
                        demoImage="dashboard.jpg"
                        feature={'getItems'}
                        alternatively='all'>
                        <ItemsStatistic {...props}/>
                    </CanUseFeatureContainer>
                </DocTitle>
            </EnsureLoggedInContainer>
        );
    }
}

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsStatisticContainer);