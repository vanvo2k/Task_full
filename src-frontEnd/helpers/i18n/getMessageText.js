import {defineMessages} from "react-intl";

export default (intl) => (id, defaultMessage = '') => {
    if (!intl) {
        return id;
    }

    if (!id) {
        return defaultMessage;
    }

    if (typeof intl.formatMessage !== 'function') {
        return id;
    }

    const messages = defineMessages({
        text: {
            id,
            defaultMessage
        }
    });

    return intl.formatMessage(messages.text);
};