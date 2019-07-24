import {LOGIN_START} from ''


const initialState = {
    users:[],
    error:'',
    fetchingData:false
}



const reducer = (state = initialState, action) =>{
    switch(action.type){
        case LOGIN_START:
            return{
                ...state,
                error:'',
                loggingIn:true
            };
        case LOGIN_SUCCESS:
            return{
                ...state,
                error:'',
                loggingIn:false
            };
        case LOGIN_FAIL:
            return{
                ...state,
                error:'Bad Login',
                loggingIn:false
            };



        case FETCH_DATA:
            return{
                ...state,
                error:'',
                fetchingData:true
            };
        case FETCH_DATA_SUCCESS:
            return{
                ...state,
                users:action.payload,
                loggingIn:false
            };
        case FETCH_DATA_FAIL:
            return{
                ...state,
                error:'Bad Login',
                fetchingData:false
            };
    }
}