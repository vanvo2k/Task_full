import moment from "moment";

export default (time) => {
    if (typeof  time === 'string' && time.indexOf('-ago') !== -1) {
        const arr = time.split('-');

        if (arr.length !== 3) {
            return false;
        }

        const units = ['d', 'm', 'y', 'day', 'month', 'year'];
        const unit = arr[1];

        if (units.indexOf(unit) === -1) {
            return false;
        }

        const amount = parseInt(arr[0], 10);
        return moment().subtract(amount, unit);
    }

    return false;
}