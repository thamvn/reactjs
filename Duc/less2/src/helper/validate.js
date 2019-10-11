export const validate = {
    validateName,
    validatePrice
}
function validateName(name) {
    if (name.length < 8 && name.length > 20) return { 'name': '', 'error': true, "message": "Product name should be haved from 8 to 20 character" };
    if (name.replace(/ /gi, "").length === 0) return { 'name': '', 'error': true, 'message': "Product name should not be empty" }
    var nameReg = /^[a-z A-Z]+[ 0-9a-zA-Z]*$/;
    if (!nameReg.test(name)) return { 'name': '', 'error': true, "message": "Product name should be started by character" };
    var nameP = '';
    var nameCheck = name.split(" ");
    for (var i = 0; i < nameCheck.length; i++) {
        if (!nameCheck[i]) continue;
        if (nameCheck[i] && i < nameCheck.length - 1) nameP += nameCheck[i] + " ";
        else nameP += nameCheck[i]
    }
    return { 'name': nameP, 'error': false, "message": "" }
}
function validatePrice(price) {
    if (isNaN(price)) return { 'error': true, "message": "Price should be a number" };
    var tmp = parseFloat(price);
    if (tmp < 0 || tmp > 1000) return { 'error': true, "message": "Price should be in range 0-1000" };
    var strPrice = price.toString();
    var a = [].fill(0);
    for (var i = 0; i < strPrice.length; i++) {
        strPrice[i] !== '' ? a[3 - i] = strPrice[i] : a[3 - i] = 0;
    }
    return { 'error': false, "message": "" };
}
