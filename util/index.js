const toString = Object.prototype.toString;
const isType = (type) => {
    return (obj) => {
        return toString.call(obj) == `[object ${type}]`
    }
}
exports.isBoolean = isType('Boolean');
exports.isNumber = isType('Number');