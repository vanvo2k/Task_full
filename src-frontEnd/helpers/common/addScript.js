export default (src, id = '') => {
    const scriptId = id ? id : src;
    const checkExists = document.getElementById(scriptId);
    if (checkExists) {
        return Promise.resolve();
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.id = scriptId;

    document.body.appendChild(script);

    return new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
    });
}