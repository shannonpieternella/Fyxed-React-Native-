import * as App from '../constants/app.constants'

const initialState = {
    stadSearch: null,
    navigeer: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case App.CLEAR_STATE:
            return {
                ...state,
                stadSearch: false,
            }
        case App.STAD_FILTER:
            return {
                ...state,
                stadSearch: action.payload,
        
            } 
            case App.NAVIGEER:
            return {
                ...state,
                navigeer: action.payload,
        
            } 
    default:
        return state;
};
}

export default appReducer