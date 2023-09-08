exports.decode = (input) => {
    if (!input) {
        return "";
    }

    const buf = Buffer.from(input, 'base64');

    return buf.toString('utf8');
};

exports.encode = (input) => {
    const buf = Buffer.from(input, 'utf8');

    return buf.toString('base64');
};