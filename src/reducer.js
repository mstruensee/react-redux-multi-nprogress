const actionKey = "@@react-redux-spinner/pending-task"
const actionKey2 = (key = "pendingTask") => `@@react-redux-spinner/pending-task/${key}`
const begin = "@@react-redux-spinner/begin"
const end = "@@react-redux-spinner/end"
const endAll = "@@react-redux-spinner/end-all"

const configurablePendingTasksReducer = ({ actionKeyPath = [], spinnerKey = "pendingTask" } = {}) => (state = 0, action) => {
    if (spinnerKey !== actionKey2(spinnerKey).split('/')[2]) return state


    console.log("spinnerKey:", spinnerKey)
    console.log("actionKeyPath:", actionKeyPath)
    // Reduce the action to find the configured path
    const obj = actionKeyPath.reduce((acc, path) => acc[path], action)
    console.log("obj:", obj)

    if (!obj) {
        // Configured path is not included in this action. Nothing to do.
        return state
    }
    console.log("obj[actionKey]:", obj[actionKey])
    debugger
    if (obj[actionKey2(spinnerKey)] === begin) {
        return state + 1
    }
    if (obj[actionKey2(spinnerKey)] === end) {
        if (state - 1 < 0) {
            throw new RangeError(`Number of pending tasks decreased below zero. This indicates you have an error in your code. 'end' is called more often than 'begin'.`)
        }
        return state - 1
    }
    if (obj[actionKey2(spinnerKey)] === endAll) {
        return 0
    }

    return state
}

const pendingTasksReducer = configurablePendingTasksReducer()

export { actionKey, actionKey2, begin, end, endAll, pendingTasksReducer, configurablePendingTasksReducer }
