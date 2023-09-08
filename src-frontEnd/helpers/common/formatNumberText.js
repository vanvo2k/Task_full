import formatThousandNumber from "./formatThousandNumber";

export default (number) => {
    const million = Math.round(number / 1000000);
    const isMillion = (number % 1000000 === 0) && million > 0;

    const thousand = Math.round(number / 1000);
    const isThousand = (number % 1000 === 0) && thousand > 0;

    return isMillion ? `${million}M` : (isThousand ? `${thousand}K` : formatThousandNumber(number));
}

