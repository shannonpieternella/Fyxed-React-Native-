import * as Auth from '../constants/auth.constants';
import axios from 'axios';
import {actionCreator} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const loginAction = (payload) => async (dispatch) => {
    try {
        dispatch(actionCreator(Auth.LOGIN_REQUEST, payload));
        const response = await axios.post('https://nftnotified.com/api/1.1/wf/login', payload);
        const {status, response: {token}} = response.data;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user_email', payload.email);
        await AsyncStorage.setItem('user_email_post', payload.email);
        dispatch(actionCreator(Auth.LOGIN_SUCCESS, {status}))
    } catch (error) {
        dispatch(actionCreator(Auth.LOGIN_FAIL, error.response.data));
    }
}

export const registerAction = (payload) => async (dispatch) => {
    try {
        dispatch(actionCreator(Auth.REGISTER_REQUEST, payload));
        const response = await axios.post('https://nftnotified.com/api/1.1/wf/signup', payload);
        const {status, response: {token}} = response.data;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user_email', payload.email);
        dispatch(actionCreator(Auth.REGISTER_SUCCESS, {status}))
    } catch (error) {
        dispatch(actionCreator(Auth.REGISTER_FAIL, error.response.data));
    }
}

export const forgetPasswordAction = (payload) => async (dispatch) => {
    try {
        dispatch(actionCreator(Auth.FORGOT_PASSWORD_REQUEST, payload));
        const response = await axios.post('https://nftnotified.com/api/1.1/wf/forgotpw', payload);
        const {status} = response.data;
        dispatch(actionCreator(Auth.FORGOT_PASSWORD_SUCCESS, {status}))
    } catch (error) {
        dispatch(actionCreator(Auth.FORGOT_PASSWORD_FAIL, error.response.data));
    }
}

export const logoutAction = () => async (dispatch) => {
    const keys = ['token', 'user_email'];
    await AsyncStorage.multiRemove(keys);
    return dispatch(actionCreator(Auth.SET_LOGOUT));
  };