import {createStore, compose, applyMiddleware} from 'redux'
import {reducer} from './reducers'

/*const stringEnhancer = (createStore) => (...arg) => {
    const store = createStore(...arg)
    const originalStore = store.dispatch
    store.dispatch = (action) => {
        if(typeof action === 'string') {
            return originalStore({
                type: action
            })
        }
        return originalStore(action)
    }
   return store
}*/


const logMiddleware = ({getState, dispatch}) => (next) => (action) => {
    console.log(action, getState())
    return next(action)
}

const stringMiddleware = (store) => (next) => (action) => {
   if(typeof action === 'string') {
       return next({
           type: 'ПРИВЕТ'
       })
   }
   return next(action)
}

/*const logEnhancer = (createStore) => (...arg) => {
    const store = createStore(...arg)
    const originalDispatch = store.dispatch
    store.dispatch = (action) => {
        console.log(action)
        return originalDispatch(action)
    }
    return store
}*/

// const store = createStore(reducer, compose(stringEnhancer, logEnhancer))


const store = createStore(reducer, applyMiddleware(stringMiddleware, logMiddleware))

store.dispatch('STRING ACTION')
export default store
