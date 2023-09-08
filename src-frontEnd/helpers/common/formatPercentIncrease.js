export default (percent) => {
    if (percent === 0) {
        return 0;
    }
    let string = '';
    if (percent > 0) {
        string += '+';
    } else {
        string += '-';
    }

    return string + ' ' + Math.abs(percent).toFixed(1);
};