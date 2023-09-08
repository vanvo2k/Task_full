import moment from "moment";

export default (time, milestone) => {
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

        if (milestone) {
            const milestoneMoment = moment(milestone, 'DD-MM-YYYY')
            return milestoneMoment.subtract(amount, unit)
        }
    }

    return false;
}