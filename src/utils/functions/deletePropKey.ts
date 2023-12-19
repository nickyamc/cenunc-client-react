export const deletePropKey = <T>(obj: T): T => {
    const newObj = {} as T;
    for (const prop in obj) {
        if (prop !== 'key') newObj[prop] = obj[prop]
    }
    return newObj;
}