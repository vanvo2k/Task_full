export const logEvent = ({category, action, value = null, label = ''}) => {
    if (process.env.NODE_ENV === 'production') {
        let args = {
            category,
            action
        };

        if (!Number.isNaN(value)) {
            args = {...args, value};
        }

        if (label) {
            args = {...args, label};
        }

        const event = new CustomEvent('GAEvent', {detail: args});
        window.dispatchEvent(event);
    }
};