// its middlewear to handle reducer call to update a state
const changeThemeColor = (value) => ({
    type: 'THEME',
    payload: value
});
export { changeThemeColor }