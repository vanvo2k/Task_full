import React, {Component} from 'react'
import addScript from "../../../helpers/common/addScript"
import withAuthentication from "../../../shared-components/withAuthentication"
import StorageServices from "../../../services/StorageServices"
import {_saveMeta} from "../../../services/UserService";

class FreshChat extends Component {
    state = {
        isLoaded: false,
        isSaving: false,
    }

    _isLoading = false

    componentDidMount() {
        this._setup()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this._setup()
    }

    _load = async () => {
        if (this._isLoading) return true
        if (this.state.isLoaded) return true

        const {user, isAuthenticated} = this.props
        if (!isAuthenticated || !user) return false
        const profile = Object.assign({}, Object.fromEntries(user.get('profile')))
        if (!profile || !profile.id) return false

        this._isLoading = true

        try {
            await addScript('https://wchat.freshchat.com/js/widget.js', 'fresh-chat-widget')

            this.setState({isLoaded: true})
            this._isLoading = false
        } catch (e) {
            this.setState({isLoaded: false})
            this._isLoading = false
        }
    }

    _setup = async () => {
        await this._load()
        const {fcWidget} = window
        if (!fcWidget) return

        const {user} = this.props
        const {email, name, meta, id: userId} = Object.assign({}, Object.fromEntries(user.get('profile')))

        const argsInit = {
            token: "ca662688-48ed-4a36-a1f9-2158ccfb3008",
            host: "https://wchat.freshchat.com",
            externalId: userId,
        }

        if (meta && meta.get('freshChatId')) {
            argsInit.restoreId = meta.get('freshChatId')
        }

        fcWidget.init(argsInit)

        fcWidget.setExternalId(userId)
        fcWidget.user.setFirstName(name)
        fcWidget.user.setEmail(email)

        fcWidget.on('user:created', (response) => {
            if (!response) return false
            const {status, data} = Object.assign({}, response)

            if (status === 200 && data) {
                if (data.restoreId) {
                    console.log('Restore Id:', data.restoreId)
                    this._saveRestoreId(data.restoreId)
                }
            }
        })
    }

    _saveRestoreId = async (restoreId) => {
        const {user} = this.props
        const {freshChatId} = Object.assign({}, Object.fromEntries(user.get('profile').get('meta')))
        // console.log(Object.fromEntries(user.get('profile').get('meta')))

        if (restoreId && restoreId === freshChatId) return true
        if (this.state.isSaving) return true

        this.setState({
            isSaving: true
        })

        try {
            await _saveMeta({freshChatId: restoreId})
            StorageServices.updateUserProfile({meta: {freshChatId: restoreId}})
        } catch (e) {
            console.log('Save meta error:', e)
        }

        this.setState({
            isSaving: false
        })
    }

    render() {
        return null;
    }
}

export default withAuthentication(FreshChat)


