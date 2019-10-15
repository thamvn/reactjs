export const validateName = (name) => {
    let ret = name.replace(/ {2}/g,' ');
    let result = (ret.length >= 8 && ret.length <= 20 && /[A-Z]/.test(ret[0])) ? (true) : (false);
    
    return {data: ret, result: result};
}

export const validatePrice = (price) => {
    let val = parseFloat(price);
    let result = (!isNaN(price) && val > 0 && val <= 1000) ? (true) : (false);

    return {data: price, result: result};
}
