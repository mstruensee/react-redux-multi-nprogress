import React from "react"
import PropTypes from "prop-types"
import NProgress from "./nprogress"

class Spinner extends React.Component {
    componentDidMount() {
        const { store } = this.context
        const { config } = this.props
        const nprogress = NProgress()
        this.previousPendingTasks = store.getState().pendingTasks
        nprogress.configure(config)

        this.disposeStoreSubscription = store.subscribe(() => {
            console.log(nprogress.settings)
            const diff = store.getState().pendingTasks - this.previousPendingTasks
            if (diff > 0) {
                nprogress.start()
            }
            if (diff < 0) {
                nprogress.inc()
            }
            if (store.getState().pendingTasks === 0) {
                nprogress.done()
            }
            this.previousPendingTasks = store.getState().pendingTasks
        })
    }

    componentWillUnmount() {
        this.disposeStoreSubscription()
    }

    render() {
        return false
    }
}

Spinner.contextTypes = {
    store: PropTypes.shape({
        getState: PropTypes.func.isRequired
    })
}

Spinner.propTypes = {
    config: PropTypes.object
}

Spinner.defaultProps = {
    config: {}
}

export default Spinner
