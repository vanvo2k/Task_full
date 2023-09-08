import React, {Component, createRef} from "react"
import PropTypes from "prop-types"
import {slide as Menu} from 'react-burger-menu'
import {Link, withRouter} from "react-router-dom"
import classNames from "classnames"
import UserMenuContainer from "../shared-containers/UserMenuContainer"

class OffCanvasMenu extends Component {
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

        this.props.changeOpen(true)
    }

    _handleStateMenuChange = (state) => {
        const {isOpen} = state

        if (isOpen) {
            document.body.classList.add('mobile-menu-open')
        } else {
            document.body.classList.remove('mobile-menu-open')
        }

        this.props.changeOpen(isOpen)
    }

    render() {
        const basePath = '/a'
        const {status} = this.state
        const {className, children, isOpen, menuUser} = this.props

        return (
            <div className={classNames("MobileMenu", className)}>
                <Menu width="80%"
                      onStateChange={this._handleStateMenuChange}
                      isOpen={isOpen}>
                    {
                        children
                    }

                    {
                        !!menuUser &&
                        <UserMenuContainer/>
                    }
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

OffCanvasMenu.propTypes = {
    history: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    changeOpen: PropTypes.func.isRequired,
}

export default withRouter(OffCanvasMenu)
