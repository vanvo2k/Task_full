const _onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index
}

module.exports = (array) => {
    return !Array.isArray(array) ? [] : array.filter(_onlyUnique)
};