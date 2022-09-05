import * as Popup from '../constants/popup.constants';
import axios from 'axios';
import {actionCreator} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const Mint = (payload) => async (dispatch) => {
    try {
        dispatch(actionCreator(Popup.MINT_DATE, payload));
        

    } catch (error) {
        // dispatch(actionCreator(Auth.LOGIN_FAIL, error.response.data));
        console.log('Fail')
    }
}

export const Visiblemodal = (payload) => async (dispatch) => {
    try {
        dispatch(actionCreator(Popup.VISIBLE_MODAL, payload));
        

    } catch (error) {
        // dispatch(actionCreator(Auth.LOGIN_FAIL, error.response.data));
        console.log('Fail')
    }
}

export const MintPicker = (payload) => async (dispatch) => {
    try {
        dispatch(actionCreator(Popup.MINT_PICKER, payload));
        

    } catch (error) {
        // dispatch(actionCreator(Auth.LOGIN_FAIL, error.response.data));
        console.log('Fail')
    }
}

export const RevealPicker = (payload) => async (dispatch) => {
    try {
        dispatch(actionCreator(Popup.REVEAL_PICKER, payload));
        

    } catch (error) {
        // dispatch(actionCreator(Auth.LOGIN_FAIL, error.response.data));
        console.log('Fail')
    }
}

export const Revealpopup = (payload) => async (dispatch) => {
    try {
        dispatch(actionCreator(Popup.REVEAL_POPUP, payload));
        

    } catch (error) {
        // dispatch(actionCreator(Auth.LOGIN_FAIL, error.response.data));
        console.log('Fail')
    }
}


export const Mintpopup = (payload) => async (dispatch) => {
    try {
        dispatch(actionCreator(Popup.MINT_POPUP, payload));
        

    } catch (error) {
        // dispatch(actionCreator(Auth.LOGIN_FAIL, error.response.data));
        console.log('Fail')
    }
}

export const Modaluser = (payload) => async (dispatch) => {
    try {
        dispatch(actionCreator(Popup.MODAL_USER, payload));
        

    } catch (error) {
        // dispatch(actionCreator(Auth.LOGIN_FAIL, error.response.data));
        console.log('Fail')
    }
}

export const TimeZone = (payload) => async (dispatch) => {
    try {
        dispatch(actionCreator(Popup.TIME_ZONE, payload));
        

    } catch (error) {
        // dispatch(actionCreator(Auth.LOGIN_FAIL, error.response.data));
        console.log('Fail')
    }
}

export const Reveal = (payload) => async (dispatch) => {
    try {
        dispatch(actionCreator(Popup.REVEAL_DATE, payload));
        

    } catch (error) {
        // dispatch(actionCreator(Auth.LOGIN_FAIL, error.response.data));
        console.log('Fail')
    }
}

export const CheckBoxOne = (payload) => async (dispatch) => {
    try {
        dispatch(actionCreator(Popup.CHECKBOX_ONE, payload));
        console.log(payload + "c1")

    } catch (error) {
        // dispatch(actionCreator(Auth.LOGIN_FAIL, error.response.data));
        console.log('Fail')
    }
}


export const CheckBoxTwo = (payload) => async (dispatch) => {
    try {
        dispatch(actionCreator(Popup.CHECKBOX_TWO, payload));
        console.log(payload + "c2")

    } catch (error) {
        // dispatch(actionCreator(Auth.LOGIN_FAIL, error.response.data));
        console.log('Fail')
    }
}

