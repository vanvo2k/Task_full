const compareVersion = require('compare-versions')

exports.getAvailableGateway = ({appVersion, isAdmin}) => {
    const versionAvailable = '1.2.1'

    try {
        if (compareVersion(appVersion, versionAvailable) < 0) {
            return Promise.resolve(['stripe'])
        }

        return Promise.resolve(['paypal'])
    } catch (error) {
        console.error(error)

        return Promise.resolve(['stripe'])
    }
}
