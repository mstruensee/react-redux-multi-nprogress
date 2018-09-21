import React, { Component } from "react"
import PropTypes from "prop-types"
import ReactDOM from "react-dom"
import { combineReducers, createStore } from "redux"

import { begin, configurablePendingTasksReducer, end, endAll, pendingTask, pendingTasksReducer, Spinner } from "../src"

import "./style.css"

// The spinner will look at the `pendingTasks` key of the store. Make sure the reducer
// modifies this key!
// NB: the reducer could also have been imported as `import { pendingTasksReducer as pendingTasks } from 'react-redux-spinner'`
// and used the ES6 shorthand properties instead.
const reducer = combineReducers({
    pendingTasks: pendingTasksReducer,
    state: configurablePendingTasksReducer({ spinnerKey: "state" }),
    buttons: configurablePendingTasksReducer({ spinnerKey: "buttons" })
})

const store = createStore(reducer)

class App extends Component {
    constructor(props, context) {
        super(props, context)
        this.store = props.store
        this.state = {
            pendingTasks: this.store.getState().pendingTasks,
            pendingTasksButtons: this.store.getState().buttons,
            pendingTasksState: this.store.getState().state
        }
        this.store.subscribe(() => this.setState({
            pendingTasks: this.store.getState().pendingTasks,
            pendingTasksButtons: this.store.getState().buttons,
            pendingTasksState: this.store.getState().state
        }))
        this.increase = this.increase.bind(this)
        this.increaseButtons = this.increaseButtons.bind(this)
        this.increaseState = this.increaseState.bind(this)
        this.decrease = this.decrease.bind(this)
        this.decreaseButtons = this.decreaseButtons.bind(this)
        this.decreaseState = this.decreaseState.bind(this)
        this.finishAll = this.finishAll.bind(this)
        this.finishAllButtons = this.finishAllButtons.bind(this)
        this.finishAllState = this.finishAllState.bind(this)
    }

    getChildContext() {
        return { store: this.store }
    }

    increase() {
        store.dispatch({
            type: "FETCHING_ASYNC_DATA",
            [pendingTask]: begin // key surrounded by [] to evaluate the value
        })
    }

    increaseButtons() {
        store.dispatch({
            type: "FETCHING_ASYNC_DATA",
            [pendingTask]: begin, // key surrounded by [] to evaluate the value
            meta: { spinnerKey: "buttons" }
        })
    }

    increaseState() {
        store.dispatch({
            type: "FETCHING_ASYNC_DATA",
            [pendingTask]: begin, // key surrounded by [] to evaluate the value
            meta: { spinnerKey: "state" }
        })
    }

    decrease() {
        if (this.state.pendingTasks === 0) {
            return
        }

        store.dispatch({
            type: "DONE_FETCHING_ASYNC_DATA",
            [pendingTask]: end // key surrounded by [] to evaluate the value
        })
    }

    decreaseButtons() {
        if (this.state.pendingTasksButtons === 0) {
            return
        }

        store.dispatch({
            type: "DONE_FETCHING_ASYNC_DATA",
            [pendingTask]: end, // key surrounded by [] to evaluate the value
            meta: { spinnerKey: "buttons" }
        })
    }

    decreaseState() {
        if (this.state.pendingTasksState === 0) {
            return
        }

        store.dispatch({
            type: "DONE_FETCHING_ASYNC_DATA",
            [pendingTask]: end, // key surrounded by [] to evaluate the value
            meta: { spinnerKey: "state" }
        })
    }

    finishAll() {
        store.dispatch({
            type: "FINISH_ALL_PENDING_TASKS",
            [pendingTask]: endAll // key surrounded by [] to evaluate the value
        })
    }

    finishAllButtons() {
        store.dispatch({
            type: "FINISH_ALL_PENDING_TASKS",
            [pendingTask]: endAll, // key surrounded by [] to evaluate the value
            meta: { spinnerKey: "buttons" }
        })
    }

    finishAllState() {
        store.dispatch({
            type: "FINISH_ALL_PENDING_TASKS",
            [pendingTask]: endAll, // key surrounded by [] to evaluate the value
            meta: { spinnerKey: "state" }
        })
    }

    render() {
        return (
            <div>
                <Spinner config={ { trickleRate: 0.02, parent: "body" } }/>
                <Spinner config={ { trickleRate: 0.02, parent: "div.buttons", spinnerKey: "buttons" } }/>
                <Spinner config={ { trickleRate: 0.02, parent: "div.state", spinnerKey: "state" } }/>
                <h1>react-redux-spinner example</h1>
                <div className="buttons">
                    <button onClick={ this.increase }>Start async task</button>
                    <button onClick={ this.decrease }>Finish async task</button>
                    <button onClick={ this.finishAll }>Finish all tasks</button>
                    <br/>
                    <br/>
                    <button onClick={ this.increaseButtons }>Start async task BUTTONS</button>
                    <button onClick={ this.decreaseButtons }>Finish async task BUTTONS</button>
                    <button onClick={ this.finishAllButtons }>Finish all tasks BUTTONS</button>
                    <br/>
                    <br/>
                    <button onClick={ this.increaseState }>Start async task STATE</button>
                    <button onClick={ this.decreaseState }>Finish async task STATE</button>
                    <button onClick={ this.finishAllState }>Finish all tasks STATE</button>

                </div>
                <div className="state">
                    Current pending tasks: { this.state.pendingTasks }
                    <br/>
                    Current pending tasks BUTTONS: { this.state.pendingTasksButtons }
                    <br/>
                    Current pending tasks STATE: { this.state.pendingTasksState }
                </div>
            </div>
        )
    }
}

App.propTypes = {
    store: PropTypes.object.isRequired
}
App.childContextTypes = {
    store: PropTypes.object.isRequired
}

document.addEventListener("DOMContentLoaded", () => {
    const root = document.createElement("div")
    document.body.appendChild(root)
    ReactDOM.render(<App store={ store }/>, root)
})
