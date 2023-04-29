export default function reducer(state = {
    unitDetails: {},
    createUnitDetails:{}
}, action) {
    switch(action.type) {
        case "GET_UNIT_DETAIL":{
            return {...state, unitDetails: action.payload}
        }
        case "CREATE_UNIT_DETAIL":{
            return {...state, createUnitDetails: action.payload}
        }
       
    }

    return state;
}