import moment from "moment";
import {getUserLanguage} from "../../services/LocaleServices";

export default (time, format, timeZone = null) => {
    const defaultFormat = getUserLanguage() === 'en' ? 'dddd, MMMM Do YYYY, h:mm:ss a' : 'DD/MM/YYYY, H:mm:ss';
    const formatValidated = format ? format : defaultFormat;

    const momentTime = Number.isInteger(timeZone) ? moment(time).utcOffset(timeZone) : moment(time);

    return momentTime.format(formatValidated);
};