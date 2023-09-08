import moment from "moment";

export default (deadline) => {
    const momentDeadline = moment(deadline);
    const now = moment();

    if (now.isAfter(momentDeadline)) {
        return '';
    }

    return now.to(momentDeadline, true);
};