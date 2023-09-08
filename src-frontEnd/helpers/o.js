import {Base64} from 'js-base64'

const __o = function (str = "", key, n = 126) {
    const string = str + "";

    if (!(typeof(key) === 'number' && key % 1 === 0)
        || !(typeof(key) === 'number' && key % 1 === 0)) {
        return string.toString();
    }

    let chars = string.toString().split('');

    for (let i = 0; i < chars.length; i++) {
        const c = chars[i].charCodeAt(0);

        if (c <= n) {
            chars[i] = String.fromCharCode((chars[i].charCodeAt(0) + key) % n);
        }
    }

    return chars.join('');
};

const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default (str) => {
    if (!str) {
        return str;
    }

    const strValidated = typeof str === "string" ? str : JSON.stringify(str);

    const encoded = Base64.encode(strValidated);
    // const encoded = window.btoa(strValidated);
    const randomInt = rand(5, 20);

    return "." + randomInt + "." + __o(encoded, randomInt);
}