import React, {Component} from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap"
import {FormattedMessage} from "react-intl"
import {addLanguageListener, getUserLanguage, removeLanguageListener} from "../../services/LocaleServices"
import getCookie from "../../helpers/cookie/getCookie"
import setCookie from "../../helpers/cookie/setCookie"
import CanUseFeatureContainer from "../CanUseFeatureContainer"

class UserMenu extends Component {
    state = {
        language: getUserLanguage(),
        hideNotify: !!getCookie('_user_menu_hide_notify'),
        open: false
    }

    componentDidMount() {
        addLanguageListener(this._handleLanguageChange)
    }

    componentWillUnmount() {
        removeLanguageListener(this._handleLanguageChange)
    }

    _handleLanguageChange = () => {
        this.setState({
            language: getUserLanguage()
        })
    }

    _handleToggle = () => {
        setCookie('_user_menu_hide_notify', true, 30)

        this.setState(({open}) => ({
            open: !open,
            hideNotify: true
        }))
    }

    _openFreshChat = () => {
        if (window.hasOwnProperty("fcWidget")) {
            window.fcWidget.open()
            window.fcWidget.show()
        }
    }

    render() {
        const {profile, isAdmin} = this.props
        const {open, hideNotify} = this.state

        return (
            <div className="UserMenu">
                <Dropdown isOpen={open} toggle={this._handleToggle}>
                    <DropdownToggle
                        tag="span"
                        caret>
                        <img className="Avatar" src={profile.get('avatar')}
                             alt="avatar"/> {profile.get('name')}
                        {
                            !hideNotify && <span className="Notify">1</span>
                        }
                    </DropdownToggle>

                    <DropdownMenu right>
                        {
                            isAdmin &&
                            <Link className="dropdown-item" to='/ass'>Admin Panel</Link>
                        }
                        <CanUseFeatureContainer feature='super-private' noAlert>
                            <DropdownItem tag={Link} to="/a/trends">
                                <FormattedMessage id="mainMenu.trends"/>
                            </DropdownItem>
                        </CanUseFeatureContainer>
                        <a
                            className="dropdown-item"
                            rel="noopener noreferrer"
                            href="#"
                            onClick={this._openFreshChat}><FormattedMessage id="user_menu.support"/></a>
                        <DropdownItem tag={Link} to="/settings/billing">
                            <FormattedMessage id="user_menu.billing"/>
                        </DropdownItem>
                        <DropdownItem tag={Link} to="/settings/affiliate">
                            <FormattedMessage id="user_menu.affiliates"/>
                        </DropdownItem>
                        <DropdownItem tag={Link} to="/settings">
                            <FormattedMessage id="user_menu.settings"/>
                        </DropdownItem>
                        <a className='dropdown-item' rel="noopener noreferrer"
                           target="_blank"
                           href="http://spybadao.com/?utm_source=sa-app&utm_medium=sa-menu&utm_campaign=sa-ref">
                            SpyBadass now
                            <span className="Badge"><FormattedMessage
                                id="user_menu.new"/></span>
                        </a>
                        <DropdownItem divider/>
                        <DropdownItem onClick={this._handleClickLogOut.bind(this)}>
                            <FormattedMessage id="user_menu.sign_out"/>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        )
    }

    _handleClickLogOut() {
        this.props.logOut()
        if (window.hasOwnProperty('fcWidget')) {
            window.fcWidget.hide()
        }
    }
}

UserMenu.propTypes = {
    profile: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isSuperAdmin: PropTypes.bool.isRequired,
}

export default UserMenu
