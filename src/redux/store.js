import {createStore} from 'redux'
import combinReducers from './reducers.js'

let store = createStore(combinReducers)

export default store
