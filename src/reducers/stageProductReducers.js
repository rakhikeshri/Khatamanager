export default function reducer(state = {
    stageProductDetails: {},
    createStageProductDetails:{},
    productUploadSession:{}
}, action) {
    switch(action.type) {
        case "GET_STAGE_PRODUCT":{
            return {...state, stageProductDetails: action.payload}
        }
        case "UPDATE_STAGE_PRODUCT":{
            return {...state, createStageProductDetails: action.payload}
        }
        case "CREATE_PRODUCT_UPLOAD_SESSION":{
            return {...state, productUploadSession: action.payload}
        }
       
    }

    return state;
}