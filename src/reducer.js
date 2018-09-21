const actionKey = "@@react-redux-spinner/pending-task"
const begin = "@@react-redux-spinner/begin"
const end = "@@react-redux-spinner/end"
const endAll = "@@react-redux-spinner/end-all"

const configurablePendingTasksReducer = ({ actionKeyPath = [], spinnerKey: curriedSpinnerKey = "pendingTask" } = {}) => (state = 0, action) => {

    const { meta } = action
    const { spinnerKey = "pendingTask" } = meta || {}

    console.log(spinnerKey, curriedSpinnerKey)
    if (spinnerKey !== curriedSpinnerKey) return state


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

    if (obj[actionKey] === begin) {
        return state + 1
    }
    if (obj[actionKey] === end) {
        if (state - 1 < 0) {
            throw new RangeError(`Number of pending tasks decreased below zero. This indicates you have an error in your code. 'end' is called more often than 'begin'.`)
        }
        return state - 1
    }
    if (obj[actionKey] === endAll) {
        return 0
    }

    return state
}

const pendingTasksReducer = configurablePendingTasksReducer()

export { actionKey, begin, end, endAll, pendingTasksReducer, configurablePendingTasksReducer }
