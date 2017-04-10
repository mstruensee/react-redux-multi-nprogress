import './nprogress.css';
import { configurablePendingTasksReducer, pendingTasksReducer, actionKey, begin, end } from './reducer.js';
import Spinner from './spinner.js';

export {
  configurablePendingTasksReducer,
  pendingTasksReducer,
  Spinner,
  actionKey as pendingTask,
  begin,
  end
};
