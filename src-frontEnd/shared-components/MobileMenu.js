import React, {Component, createRef} from "react"
import PropTypes from "prop-types"
import {slide as Menu} from 'react-burger-menu'
import {FormattedMessage, injectIntl} from "react-intl"
import {Link, NavLink, withRouter} from "react-router-dom"
import classNames from "classnames"
import TMTotalWarningsContainer from "../app/trademark/components/shared/TMTotalWarningsContainer"
import UserMenuContainer from "../shared-containers/UserMenuContainer"
import getMessageText from "../helpers/i18n/getMessageText"

class MobileMenu extends Component {
    _currentY = window.pageYOffset
    _touchY = window.pageYOffset
    _header = createRef()
    _headerHeight = 0
    _className = ''
    _scrollDelay = null

    state = {
        isOpen: false,
        status: '',
    }

    componentDidMount() {
        this._headerHeight = this._computedHeader()
        window.addEventListener('scroll', this._handleOnScroll)
        window.addEventListener('touchstart', this._handleTouchStart)
        window.addEventListener('touchend', this._handleTouchEnd)
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this._handleChangeRoute()
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._handleOnScroll)
        window.removeEventListener('touchstart', this._handleTouchStart)
        window.removeEventListener('touchend', this._handleTouchEnd)
    }

    _getLanguageText(key) {
        return getMessageText(this.props.intl)(`mainMenu.${key}`)
    }

    _changeToInit() {
        this._className = 'menu-show'
        document.body.classList.remove('mobile-menu-open')

        return this.setState({
            status: 'init'
        })
    }

    _handleTouchStart = (e) => {
        this._touchY = window.pageYOffset
    }

    _handleTouchEnd = (e) => {
        const _touchY = window.pageYOffset

        if (_touchY <= 0) {
            return this._changeToInit()
        }

        if (_touchY === this._touchY) {
            return
        }

        this._delayScroll(_touchY, this._touchY)
    }

    _handleChangeRoute = () => {
        this._changeToInit()
    }

    _computedHeader() {
        const {current} = this._header
        return current.clientHeight
    }

    _handleOnScroll = () => {
        if (this._scrollDelay) {
            clearTimeout(this._scrollDelay)
        }

        this._scrollDelay = setTimeout(() => {
            const offsetY = window.pageYOffset
            const currentOffsetY = this._currentY

            if (offsetY <= 0) {
                return this._changeToInit()
            }

            if (currentOffsetY === offsetY) {
                return
            }

            this._delayScroll(offsetY, currentOffsetY)

            this._currentY = offsetY
        }, 100)
    }

    _delayScroll(offsetY, currentOffsetY) {
        if (offsetY < 0) {
            this.setState({
                status: 'init',
            })

            this._className = 'menu-show'
            return
        }

        if (offsetY > currentOffsetY) {//scroll down
            this.setState({
                status: 'down'
            })

            if (offsetY > this._headerHeight) {
                this._className = 'menu-hidden'
            }
        } else {//up
            this.setState({
                status: 'up'
            })

            if (offsetY > this._headerHeight) {
                this._className = 'affix menu-show'
            } else {
                this._className = 'menu-show'
            }
        }
    }


    _handleOpenMenu = (e) => {
        e.preventDefault()

        this.setState({
            isOpen: true
        })
    }

    _closeMenu = (e) => {
        this.setState({
            isOpen: false
        })
    }

    _handleStateMenuChange = (state) => {
        if (state.isOpen) {
            document.body.classList.add('mobile-menu-open')
        } else {
            document.body.classList.remove('mobile-menu-open')
        }

        this.setState({
            isOpen: state.isOpen
        })
    }

    render() {
        const basePath = '/a'
        const {status, isOpen} = this.state

        return (
            <div className="MobileMenu">
                <Menu width="80%"
                      onStateChange={this._handleStateMenuChange}
                      isOpen={isOpen}>
                    <ul className="Menu nav flex-column">
                        <li className="nav-item">
                            <NavLink className="nav-link"
                                     onClick={this._closeMenu}
                                     title={this._getLanguageText('product')}
                                     to={`${basePath}/items`}>
                                <span className="Text">
                                    <i className="linear-shirt" aria-hidden="true"/>
                                    <FormattedMessage id="mainMenu.product"/>
                                </span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link"
                                     onClick={this._closeMenu}
                                     title={this._getLanguageText('events')}
                                     to={`${basePath}/events`}>
                                <span className="Text">
                                    <i className="linear-calendar-text" aria-hidden="true"/>
                                    <FormattedMessage id="mainMenu.events"/>
                                </span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link"
                                     onClick={this._closeMenu}
                                     title={this._getLanguageText('keyword')}
                                     to={`${basePath}/keywords`}>
                                <span className="Text">
                                    <i className="linear-key" aria-hidden="true"/>
                                    <FormattedMessage id="mainMenu.keyword"/>
                                </span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                onClick={this._closeMenu}
                                title={this._getLanguageText('favorites')}
                                className="nav-link" to={`${basePath}/favorites`}>
                                <span className="Text">
                                    <i className="linear-heart" aria-hidden="true"/>
                                    <FormattedMessage id="mainMenu.favorites"/>
                                </span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                onClick={this._closeMenu}
                                title={this._getLanguageText('trademark')}
                                className="nav-link" to={`${basePath}/trademark`}>
                                <span className="Text">
                                    <i className="fas fa-trademark" aria-hidden="true"/>
                                    <FormattedMessage id="mainMenu.trademark"/>
                                    <TMTotalWarningsContainer/>
                                </span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link"
                                     title={this._getLanguageText('dashboard')}
                                     onClick={this._closeMenu}
                                     to={`${basePath}/statistic`}>
                                <span className="Text">
                                    <i className="linear-pie-chart" aria-hidden="true"/>
                                    <FormattedMessage id="mainMenu.dashboard"/>
                                </span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                onClick={this._closeMenu}
                                title={this._getLanguageText('resizer')}
                                className="nav-link" to={`${basePath}/resizer`}>
                                <span className="Text">
                                    <i className="linear-expand4" aria-hidden="true"/>
                                    <FormattedMessage id="mainMenu.resizer"/>
                                </span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                onClick={this._closeMenu}
                                title={this._getLanguageText('history')}
                                className="nav-link" to={`${basePath}/history`}>
                                <span className="Text">
                                    <i className="linear-history" aria-hidden="true"/>
                                    <FormattedMessage id="mainMenu.history"/>
                                </span>
                            </NavLink>
                        </li>
                    </ul>

                    <UserMenuContainer/>
                </Menu>

                <header ref={this._header} className={classNames("Header", status, this._className)}>
                    <button onClick={this._handleOpenMenu}>
                        <span/>
                        <span/>
                        <span/>
                    </button>

                    <Link to={basePath} className="Logo">
                    </Link>
                </header>
            </div>
        )
    }
}

MobileMenu.propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default withRouter(injectIntl(MobileMenu))
