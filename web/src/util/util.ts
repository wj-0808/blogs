const isType = (type: string) => {
    return (obj: object) => {
        return toString.call(obj) == `[object ${type}]`
    }
}
export const isString: Function = isType('String');
