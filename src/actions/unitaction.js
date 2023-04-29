import xttp from "./../common/network";
import { getConfig } from "./../common/AppConfig";


export function getUnitDetails(token) {
    return async function(dispatch) {
        const input = {
            method: "get",
            url: getConfig("api").host+getConfig("api").root+"/unit/paginate/1/10",
            headers: {
                "ph-access-token": token
            },
           
        }

        const response = await xttp(input);

        // console.log("Get Unit Data === ", response);

        if(response.code !== 200) {
            alert(response.code+", "+response.error); 
        } 
       
        dispatch({
            type : "GET_UNIT_DETAIL",
            payload: response.data
        });
    }
}

export function updateUnitDetails(token, body, method) {
    return async function(dispatch) {
        const input = {
            method: method,
            url: getConfig("api").host+getConfig("api").root+"/unit",
            headers: {
                "ph-access-token": token
            },
            data: body
        }
        console.log("input-", input)

        const response = await xttp(input);

        console.log("update unit === ", response);

        if(response.code !== 200) {
            alert(response.code+", "+response.error); 
        } 
        console.log("update ptrofile == ", response.data)
        dispatch({
            type : "CREATE_UNIT_DETAIL",
            payload: response.data
        });
    }
}
