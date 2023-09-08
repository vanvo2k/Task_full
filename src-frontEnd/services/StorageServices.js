class StorageServices {
    _prefix = 'com.marketify.tamz.'

    _getRealKey(key, noPrefix = false) {
        if (noPrefix) {
            return key
        }

        return this._prefix + key
    }

    remove(key) {
        return localStorage.removeItem(this._getRealKey(key))
    }

    getUserData() {
        return this.get('profile') || {}
    }

    setUserData(profile) {
        return this.set('profile', profile)
    }

    removeUserData() {
        return this.remove('profile')
    }

    saveUserSettings(settings) {
        const profile = this.getUserData()
        const currentSettings = profile.settings || {}
        const updatedSettings = {...currentSettings, ...settings}

        this.setUserData({...profile, settings: updatedSettings})
    }

    updateUserScopes(scopes) {
        const profile = this.getUserData()

        return this.setUserData({
            ...profile,
            scopes
        })
    }

    updateUserRoles(roles) {
        const profile = this.getUserData()

        return this.setUserData({
            ...profile,
            roles
        })
    }

    updateUserProfile(args) {
        const vArgs = Object.assign({}, args)
        const currentUser = this.getUserData()
        const currentProfile = Object.assign({}, currentUser.profile)

        const updatedUser = {
            ...currentUser,
            profile: {
                ...currentProfile,
                ...vArgs
            }
        }

        this.setUserData(updatedUser)
    }

    get(key, defaultValue = null, noPrefix = false) {
        const value = localStorage.getItem(this._getRealKey(key, noPrefix)) || defaultValue

        try {
            return JSON.parse(value)
        } catch (e) {
            return value
        }
    }

    set(key, value) {
        const type = typeof(value)
        if (type === 'object') {
            value = JSON.stringify(value)
        }

        return localStorage.setItem(this._getRealKey(key), value)
    }
}

export default new StorageServices()
