export default (name, value, exdays = 90, domain = '') => {
    const d = new Date();
    d.setTime(Date.now() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    let _cookie = name + "=" + value + ";" + expires + ";";

    if (domain) {
        _cookie += `domain=.${domain};`;
    }

    _cookie += 'path=/';

    document.cookie = _cookie;
}