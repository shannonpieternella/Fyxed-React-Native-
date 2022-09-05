import * as Auth from '../constants/auth.constants';

const initialState = {
    isAuthenticated: false,
    authLoading: false,
    error: null,
    user: null,
    checkLogin: true,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case Auth.CLEAR_STATE:
            return {
                ...state,
                user: null,
            }
        case Auth.LOGIN_REQUEST:
            return {
                ...state,
                authLoading: true,
            }
        case Auth.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                authLoading: false,
                user: action.payload,
            }
        case Auth.LOGIN_FAIL:
            return {
                ...state,
                authLoading: false,
                error: action.payload,
            }
        case Auth.REGISTER_REQUEST:
            return {
                ...state,
                authLoading: true,
            }
        case Auth.REGISTER_SUCCESS:
            return {
                ...state,
                authLoading: false,
                isAuthenticated: true,
                user: action.payload,
            }
        case Auth.REGISTER_FAIL:
            return {
                ...state,
                authLoading: false,
                error: action.payload,
            }
            case Auth.SET_LOGIN:
                return {
                  ...state,
                  checkLogin: false,
                  isAuthenticated: true,
                };
        case Auth.SET_LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                checkLogin: false,
                user: null,
            }
        case Auth.FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                authLoading: true,
            }
        case Auth.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                authLoading: false,
                user: action.payload,
            }
        case Auth.FORGOT_PASSWORD_FAIL:
            return {
                ...state,
                authLoading: false,
                error: action.payload,
            }
            default:
                return state;
    };
}

export default authReducer;