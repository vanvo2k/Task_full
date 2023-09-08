import React, {Component} from "react";
import EnsureLoggedInContainer from "../../../shared-containers/EnsureLoggedInContainer";
import CanUseFeatureContainer from "../../../shared-containers/CanUseFeatureContainer";
import DocTitle from "../../../shared-components/DocTitle";
import classNames from "classnames";

import FavoriteCategoryPage from "./FavoriteCategoryPage";
import IgnorePostContainer from "../../ignore-post/components/IgnorePostContainer";
import {changeQuerySearch, parseSearchQuery} from "../../../helpers/RouterHelper";

class FavoriteCategoryContainer extends Component {
    state = {
        mode: 'favorite',
    }

    componentDidMount() {
        this._handleInitMode();
    }

    _handleInitMode = () =>{
        const {history} = this.props;

        const parsed = parseSearchQuery(history);
        if (parsed && parsed.mode) {
            changeQuerySearch(history)({mode: parsed.mode});
            this.setState({
                mode: parsed.mode,
            })
        }
    }

    _handleChangeMode = (value)=>{
        this.setState({
            mode: value
        })
        const {history} = this.props;
        changeQuerySearch(history)({mode: value});
    }
    
    render() {
        const {mode} = this.state;

        return (
            <EnsureLoggedInContainer>
                <DocTitle title="Favorite products">
                    <CanUseFeatureContainer
                        demoImage="trends.jpg"
                        feature={'getItems'}
                        alternatively='all'>
                        <div className="FavoriteCategoryPage">
                            <div className="container">
                                <div style={{display: 'flex', margin: '15px 0px'}}>
                                    <div className={classNames("BtnChangeMode", {active: mode === 'favorite'})} onClick={()=>this._handleChangeMode('favorite')} >Favorites categories</div>
                                    <div className={classNames("BtnChangeMode", {active: mode === 'ignore'})} onClick={()=>this._handleChangeMode('ignore')} >Ignore Posts</div>
                                </div>
                                    {mode === 'ignore' ? <IgnorePostContainer /> : <FavoriteCategoryPage/>}
                            </div>
                        </div>
                    </CanUseFeatureContainer>
                </DocTitle>
            </EnsureLoggedInContainer>
        );
    }
}

export default FavoriteCategoryContainer;