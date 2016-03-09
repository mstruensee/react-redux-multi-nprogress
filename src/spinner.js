import React from 'react';
import Loader from 'react-loader';

class Spinner extends React.Component {

  componentWillMount() {
    const { store } = this.context;
    this.previousPendingTasks = store.getState().pendingTasks;
    this.disposeStoreSubscription = store.subscribe(() => {
      if (this.previousPendingTasks !== store.getState().pendingTasks) {
        this.previousPendingTasks = store.getState().pendingTasks;
        this.forceUpdate();
      }
    });
  }

  componentWillUnmount() {
    this.disposeStoreSubscription();
  }

  render() {
    const { pendingTasks } = this.context.store.getState();
    return (<Loader {...this.props} loaded={pendingTasks === 0} />);
  }
}

Spinner.contextTypes = {
  store: React.PropTypes.shape({
    getState: React.PropTypes.func.isRequired
  })
};

export default Spinner;
