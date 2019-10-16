export const funCommon = {
    add,
    minus
}
function add(list, item) {
    var index = list.indexOf(item);
    if (index >= 0) {
        list[index].numberItem++;
    }
    else {
        alert("No item is founded")
    }
    return list
}
function minus(list, item) {
    var index = list.indexOf(item);
    if (index >= 0) {
        list[index].numberItem--;
        if (list[index].numberItem <= 0) list.splice(index, 1);
    }
    else {
        alert("No item is founded")
    }
    return list
}