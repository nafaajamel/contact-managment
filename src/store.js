import {createStore} from 'redux';

const reducer = (state=[],action)=>{

    switch(action.type){
        case "ADD":
        return [...state,action.contact]
        case "DELETE":
        return state.filter(x=>x.id!==action.id)
        case "EDIT":
        return state.map(x=>x.id===action.contact.id?x=action.contact:x)
        default:
        return state
    }

}

const store = createStore(reducer)

console.log(store.getState())

export default store