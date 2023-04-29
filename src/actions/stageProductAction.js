import xttp from "./../common/network";
import { getConfig } from "./../common/AppConfig";


// export function getStageProductDetails(token) {
//     return async function(dispatch) {
//         const input = {
//             method: "get",
//             url: getConfig("api").host+getConfig("api").root+"/unit/paginate/1/10",
//             headers: {
//                 "ph-access-token": token
//             },
           
//         }

//         const response = await xttp(input);

//         // console.log("Get Unit Data === ", response);

//         if(response.code !== 200) {
//             alert(response.code+", "+response.error); 
//         } 
       
//         dispatch({
//             type : "GET_STAGE_PRODUCT",
//             payload: response.data
//         });
//     }
// }



export function updateStageProductDetails(token,body) {
    return async function(dispatch) {
        const input = {
            method: "post",
            url: getConfig("api").host+getConfig("api").root+"/stagedProduct/bulk",
            headers: {
                "ph-access-token": token
            },
            data: body
           
        }

        const response = await xttp(input);

        console.log("UPDATE_STAGE_PRODUCT === ", response);

        if(response.code !== 200) {
            alert(response.code+", "+response.error); 
        } 
       
        dispatch({
            type : "UPDATE_STAGE_PRODUCT",
            payload: response.data
        });
    }
}


export function createProductUploadSession(token,body) {
    return async function(dispatch) {
        const input = {
            method: "post",
            url: getConfig("api").host+getConfig("api").root+"/productsUploadSession/",
            headers: {
                "ph-access-token": token
            },
            data: body
           
        }

        const response = await xttp(input);

        // console.log("Create_Product_Session === ", response);

        if(response.code !== 200) {
            alert(response.code+", "+response.error); 
        } 
       
        dispatch({
            type : "CREATE_PRODUCT_UPLOAD_SESSION",
            payload: response.data
        });
    }
}