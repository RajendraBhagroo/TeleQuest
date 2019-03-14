import {SIGN_IN, SIGN_OUT, SIGN_IN_SUCCESS, SIGN_IN_FAILURE} from "./types";

/*SIGN_IN*/
export function signinRequest (userId, password) {
    
}

export function signin() {
    return{
        type: SIGN_IN
    };
}

export function signinsuccess (userId) {
    return{
        type: SIGN_IN_SUCCESS,
        userId
    };
}

export function signinfailure () {
    return{
        type: SIGN_IN_FAILURE
    };
}

export function signout () {
    return{
        type: SIGN_OUT
    };
}

