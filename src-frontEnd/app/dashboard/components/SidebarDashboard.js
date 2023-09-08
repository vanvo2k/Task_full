import React, {Component,useState} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Link, NavLink} from "react-router-dom";
import TMTotalWarningsContainer from "../../trademark/components/shared/TMTotalWarningsContainer";
import UserMenuContainer from "../../../shared-containers/UserMenuContainer";
import {Tooltip} from 'react-tippy';
import {injectIntl, FormattedMessage} from "react-intl";
import getMessageText from "../../../helpers/i18n/getMessageText";
import IntroToolsDashboard from "./IntroToolsDashboard"
import CanUseFeatureContainer from "../../../shared-containers/CanUseFeatureContainer";


const Tooltipped = ({title, children, disabled}) => {
    return (
        <Tooltip disabled={disabled} popperOptions={{modifiers: {preventOverflow: {enabled: true, padding: -200}}}}
                 position="left"
                 title={title}>
            {children}
        </Tooltip>
    );
};


class SidebarDashboard extends Component {
    _getLanguageText(key) {
        return getMessageText(this.props.intl)(key);
    }

    render() {
        
        const {className, basePath, isOpenSidebar} = this.props;
        // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        // const data=JSON.parse(localStorage.getItem("com.marketify.tamz.profile"));
        // const TradeMark = (state) => {
        //     return state;
        // };
        // var set; // Khởi tạo biến set ở đây
        // const token = localStorage.getItem("com.marketify.tamz.access_token");
        // fetch('https://localhost:3000/api/user/profile?no-cache=cd5c5770-19f5-4cf6-9eb2-4f7efac83549', {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // }).then((res) => res.json()).then((data) => {
        //     set = data.profile.scopes[1] === "vole_trademark" ? TradeMark(true) : TradeMark(false);
        //     console.log(set); // Đảm bảo log giá trị đúng ở đây
        // });
        //     // const data = response.data.profile.scopes;
        //     // data.map((item)=>{
        //     //     if(item=="vole_trademark"){
        //     //         conside=false;
        //     //     };
        //     // });
        //     console.log(set);
        return (
            <nav
                ref="root"
                className={classNames([
                    "SidebarDashboard",
                    className,
                    {collapsed: !isOpenSidebar}
                ])}>
                <ul className="nav nav-pills">
                    <li className="nav-item Logo">
                        <Link className="nav-link" title="Merch by SpyAMZ" to={basePath}>
                        </Link>
                    </li>

                    <li className="SearchProductsMenu nav-item">
                        <Tooltipped disabled={isOpenSidebar} title={this._getLanguageText('mainMenu.product')}>
                            <NavLink className="nav-link" title={this._getLanguageText('mainMenu.product')}
                                    to={`${basePath}/items`}>
                                <i className="linear-shirt" aria-hidden="true"/>
                                <span className="Text"><FormattedMessage id="mainMenu.product"/></span>
                            </NavLink>
                        </Tooltipped>
                    </li>
                    
                    {/* ========================================================= */}
                    {/* <CanUseFeatureContainer feature={"ggs-user"}  alternatively={"admin"} noAlert>
                       <li className="nav-item">
                           <Tooltipped disabled={isOpenSidebar} title={this._getLanguageText('mainMenu.ggs-product')}>
                               <NavLink className="nav-link" title={this._getLanguageText('mainMenu.ggs-product')}
                                        to={`${basePath}/ggs-products`}>
                                    <i className="linear-star" aria-hidden="true"/>
                                    <span className="Text"><FormattedMessage id="mainMenu.ggs-product"/></span>
                                </NavLink>
                            </Tooltipped>
                        </li>
                    </CanUseFeatureContainer> */}
                    {/* ========================================================= */}
                    {/* <CanUseFeatureContainer feature={"getItems"}  alternatively={"vole_trademark"} noAlert>
                        <li className="nav-item">
                            <Tooltipped disabled={isOpenSidebar} title={this._getLanguageText('mainMenu.events')}>
                                <NavLink className="nav-link" title={this._getLanguageText('mainMenu.events')}
                                        to={`${basePath}/events-calendar`}>
                                    <i className="linear-calendar-text" aria-hidden="true"/>
                                    <span className="Text"><FormattedMessage id="mainMenu.events"/></span>
                                </NavLink>
                            </Tooltipped>
                        </li>
                    </CanUseFeatureContainer> */}
                    {/* ========================================================= */}
                    <li className="nav-item">
                        <Tooltipped disabled={isOpenSidebar} title={this._getLanguageText('mainMenu.keyword')}>
                            <NavLink className="nav-link"
                                     title={this._getLanguageText('mainMenu.keyword')}
                                     to={`${basePath}/keywords`}>
                                <i className="linear-key" aria-hidden="true"/>
                                <span className="Text"><FormattedMessage id="mainMenu.keyword"/></span>
                            </NavLink>
                        </Tooltipped>
                    </li>

                    <li className="nav-item">
                        <Tooltipped disabled={isOpenSidebar} title={this._getLanguageText('mainMenu.favorites')}>
                            <NavLink className="nav-link"
                                     title={this._getLanguageText('mainMenu.favorites')}
                                     to={`${basePath}/favorites`}>
                                <i className="linear-heart" aria-hidden="true"/>
                                <span className="Text"><FormattedMessage id="mainMenu.favorites"/></span>
                            </NavLink>
                        </Tooltipped>
                    </li>

                    <li className="nav-item NavTrademark">
                        <Tooltipped disabled={isOpenSidebar} title={this._getLanguageText('mainMenu.trademark')}>
                            <NavLink className="nav-link"
                                     title={this._getLanguageText('mainMenu.trademark')}
                                     to={`${basePath}/trademark`}>
                                <i className="fas fa-trademark" aria-hidden="true"/>
                                <TMTotalWarningsContainer/>
                                <span className="Text">
                                <FormattedMessage id="mainMenu.trademark"/>
                            </span>
                            </NavLink>
                        </Tooltipped>
                    </li>

                    <li className="nav-item">
                        <Tooltipped disabled={isOpenSidebar} title={this._getLanguageText('mainMenu.dashboard')}>
                            <NavLink className="nav-link"
                                     title={this._getLanguageText('mainMenu.dashboard')}
                                     to={`${basePath}/statistic`}>
                                <i className="linear-pie-chart" aria-hidden="true"/>
                                <span className="Text"><FormattedMessage id="mainMenu.dashboard"/></span>
                            </NavLink>
                        </Tooltipped>
                    </li>
                    {/* ==============Resizer */}
                    {/* {data.scopes[1] && data.scopes[1]=="trademark"?
                    <li className="nav-item disable_li">
                        <Tooltipped disabled={isOpenSidebar} title={this._getLanguageText('mainMenu.resizer')}>
                            <NavLink className="nav-link"
                                    title={this._getLanguageText('mainMenu.resizer')}
                                    to={`${basePath}/resizer`}>
                                <i className="linear-expand4" aria-hidden="true"/>
                                <span className="Text"><FormattedMessage id="mainMenu.resizer"/></span>
                            </NavLink>
                        </Tooltipped>
                    </li>
                    : */}
                    <li className="nav-item">
                        <Tooltipped disabled={isOpenSidebar} title={this._getLanguageText('mainMenu.resizer')}>
                            <NavLink className="nav-link"
                                    title={this._getLanguageText('mainMenu.resizer')}
                                    to={`${basePath}/resizer`}>
                                <i className="linear-expand4" aria-hidden="true"/>
                                <span className="Text"><FormattedMessage id="mainMenu.resizer"/></span>
                            </NavLink>
                        </Tooltipped>
                    </li>
                    {/* } */}
                    
                    <li className="nav-item">
                        <Tooltipped disabled={isOpenSidebar} title={this._getLanguageText('mainMenu.history')}>
                            <NavLink className="nav-link"
                                     title={this._getLanguageText('mainMenu.history')}
                                     to={`${basePath}/history`}>
                                <i className="linear-history" aria-hidden="true"/>
                                    <span className="Text"><FormattedMessage id="mainMenu.history"/></span>
                            </NavLink>
                        </Tooltipped>
                    </li>

                    {/* ==============Search */}
                    {/* {data.scopes[1] && data.scopes[1]=="trademark"?
                    <li className="nav-item disable_li" title="please upgrade on PRO">
                        <Tooltipped disabled={isOpenSidebar} title={this._getLanguageText('mainMenu.search')}>
                            <NavLink className="nav-link"
                                    title={this._getLanguageText('mainMenu.search')}
                                    to={`${basePath}/search`}>
                                <i className="linear-magnifier" aria-hidden="true"/>
                                <span className="Text"><FormattedMessage id="mainMenu.search"/></span>
                            </NavLink>
                        </Tooltipped>
                    </li>
                    : */}
                    <li className="nav-item ">
                        <Tooltipped disabled={isOpenSidebar} title={this._getLanguageText('mainMenu.search')}>
                            <NavLink className="nav-link"
                                     title={this._getLanguageText('mainMenu.search')}
                                     to={`${basePath}/search`}>
                                <i className="linear-magnifier" aria-hidden="true"/>
                                <span className="Text"><FormattedMessage id="mainMenu.search"/></span>
                            </NavLink>
                        </Tooltipped>
                    </li>
                    {/* } */}
                    

                    <li className="nav-item CollapseMenu">
                        <a className="nav-link" title={this._getLanguageText('mainMenu.collapse_menu')}
                           onClick={this._handleToggleCollapse.bind(this)}>
                            <i className="Close linear-chevron-left" aria-hidden="true"/>
                            <i className="Open linear-chevron-right" aria-hidden="true"/>
                            <span className="Text"><FormattedMessage id="mainMenu.collapse_menu"/></span>
                        </a>
                    </li>

                    <li className="Copyright">
                        <span>© 2018 spyamz.com.<br/> All rights reserved.</span>
                    </li>
                </ul>

                <div className="OtherApps">
                    <ul className="nav">
                        <IntroToolsDashboard tool="spybadass"/>
                        <IntroToolsDashboard tool="spyetsy"/>
                    </ul>
                </div>


                <UserMenuContainer/>
            </nav>
        );
    }

    _handleToggleCollapse(e) {
        e.preventDefault();
        this.props.toggleCollapseSidebar();
    }
}

SidebarDashboard.propTypes = {
    toggleCollapseSidebar: PropTypes.func.isRequired,
    basePath: PropTypes.string,
    isOpenSidebar: PropTypes.bool,
    intl: PropTypes.object
};

export default injectIntl(SidebarDashboard)
