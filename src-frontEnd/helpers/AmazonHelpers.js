import formatThousandNumber from "./common/formatThousandNumber";

export const filterRank = (rank) => {
    if (!rank || rank === '0') {
        return '∞';
    }

    return formatThousandNumber(rank);
};

export const getLinkImageBestQuality = (url, size = '1500') => {
    if (!url) {
        return '';
    }

    const regex = /(\._[A-Z0-9]+_\.jpg)/g;
    const regexPNG = /(\._[A-Z0-9]+_\.png)/g;

    return url
        .replace(regex, `._UL${size}_.jpg`)
        .replace(regexPNG, `._UL${size}_.png`);
};

export const detectASIN = (query) => {
    if (!query || !query.length) {
        return false
    }

    if (query.length !== 10) {
        return false
    }

    const regex = /^(B0)[\dA-Z]+/g
    const parsed = regex.exec(query)
    if (!parsed || parsed.length !== 2) {
        return false
    }

    return parsed[0] === query
}
