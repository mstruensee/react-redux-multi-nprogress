const actionKey = '@@___pendingTask___@@';
const begin = 'begin';
const end = 'end';

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
