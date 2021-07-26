
interface Action {
    type: string;
    payload: any;
}



export function navbarReducer(state: any = {}, action: Action): any {
    switch (action.type) {
        case "SET_NAVBAR":
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
export function userReducer(state: any = {}, action: Action): any {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                ...action.payload
            };
        case "LOGOUT":
            return {};
        default:
            return state;
    }
}
export function postReducer(state: any = {}, action: Action): any {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                ...action.payload
            };
        case "LOGOUT":
            return {};
        default:
            return state;
    }
}