import * as App from '../constants/app.constants';
import axios from 'axios';
import {actionCreator} from '../utils';

export const SetStadFilter = (payload) => async (dispatch) => {
    try {
        dispatch(actionCreator(App.STAD_FILTER, payload));
        console.log("It worked " + payload)
    } catch (error) {
        dispatch(actionCreator(App.SET_NFTNOTIFIED_TOKEN_FAIL, error.response.data));
        console.log("It didnt work " + payload)

    }
}

export const SetNavigeer = (payload) => async (dispatch) => {
    try {
        dispatch(actionCreator(App.NAVIGEER, payload));
        console.log("It worked NAVIGEER " + payload)
    } catch (error) {
        dispatch(actionCreator(App.SET_NFTNOTIFIED_TOKEN_FAIL, error.response.data));
        console.log("It didnt work NAVIGEER" + payload)

    }
}
