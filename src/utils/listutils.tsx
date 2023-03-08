export const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index)
export const hasDuplicates = arr => findDuplicates(arr).length !== 0
