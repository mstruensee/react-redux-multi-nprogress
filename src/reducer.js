const actionKey = Symbol('@@react-redux-spinner/pending-task');
const begin = Symbol('@@react-redux-spinner/begin');
const end = Symbol('@@react-redux-spinner/end');

const reducer = (state = 0, action) => {
  if (action[actionKey] === begin) {
    return state + 1;
  }
  if (action[actionKey] === end) {
    return state - 1;
  }
  return state;
};

export { actionKey, begin, end, reducer as pendingTasksReducer };
