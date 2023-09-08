const getEnv = require('./getEnv')

const _validateDurationUnit = (unit) => {
    if (!unit) {
        return 'M'
    }

    const maps = {
        'D': ['day', 'days', 'd'],
        'W': ['week', 'weeks', 'w'],
        'M': ['month', 'months', 'm'],
        'Y': ['year', 'years', 'y']
    }

    for (let key in maps) {
        const values = maps[key]

        for (let i = 0; i < values.length; i++) {
            const text = values[i]

            if (text.toLowerCase() === unit.toLowerCase()) {
                return key
            }
        }
    }

    return 'M'
}

exports.getEmailReceiver = () => {
    return getEnv('/PayPal/receiver')
}

exports.getLinkSubscription = ({userId, billId, planId, title, price, currency, durationUnit = 'M', durationAmount = 1}) => {
    const PayPalConfig = getEnv('/PayPal')
    const {return_, cancel_return, notify_url} = PayPalConfig
    const business = PayPalConfig['receiver']
    const appClient = getEnv('/webClient')
    const host = getEnv('/host')
    const unitValidated = durationUnit ? _validateDurationUnit(durationUnit) : 'M'
    const amountValidated = durationAmount ? durationAmount : 1
    const custom = {
        billId,
        userId
    }

    return PayPalConfig['endpoint']
        + `?cmd=_xclick-subscriptions`
        + `&p3=${amountValidated}`
        + `&t3=${unitValidated}`
        + `&src=1`
        + `&no_note=1`
        + `&no_shipping=1`
        + `&callback_timeout=3`
        + `&callback_version=1.0.0`
        + `&charset=utf-8`
        + `&item_name=${encodeURIComponent(title)}`
        + `&item_number=${billId}`
        + `&return=${appClient}${return_}`
        + `&cancel_return=${appClient}${cancel_return}`
        + `&notify_url=${host}${notify_url}`
        + `&business=${business}`
        + `&a3=${price}`
        + `&custom=${custom}`
        + `&currency_code=${currency}`
}
