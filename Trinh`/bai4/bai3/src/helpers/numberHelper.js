const converter = require('number-to-words');

export const stringToWords = (num) => {
    if (!num || num === ".") return '';
    let intPart = num.split('.')[0];
    let decimalPart = num.split('.')[1];

    let ret = (intPart) ? (converter.toWords(parseInt(intPart))) : ('zero');

    if (decimalPart) {
        ret += ' point ';
        for (var i = 0; i < decimalPart.length; i++)
            ret += converter.toWords(parseInt(decimalPart[i])) + ' ';
    }
    return ret;
}