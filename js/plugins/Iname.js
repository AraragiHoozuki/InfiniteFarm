// Inames
DataManager.findState = function(iname) {
    return $dataStates.filter(function(state) {
        return state && state.iname == iname;
    })[0];
};