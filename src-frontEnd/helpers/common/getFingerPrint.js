import Fingerprint2 from "fingerprintjs2";

let uid = '';

const _fetch = () => {
    return new Promise((resolve, reject) => {
        new Fingerprint2({
            excludeAdBlock: true,
            excludeLanguage: true
        }).get((result) => {
            uid = result;

            resolve(result);
        });
    });
};

export default () => {
    if (uid) {
        return Promise.resolve(uid);
    }

    return _fetch();
}