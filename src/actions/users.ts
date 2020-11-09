import { userActions } from "./actionTypes";

type humanAction = any;

export function getHumans(humans: any): humanAction {
    return {
        type: userActions.GET_HUMANS,
        payload: humans,
    };
}
export function addHuman(human: any): humanAction {
    return {
        type: userActions.ADD_HUMAN,
        payload: human,
    };
}

// // Async Function expample with redux-thunk
// export function completeTodo(todoId: number) {
//     // here you could do API eg

//     return (dispatch: Function, getState: Function) => {
//         dispatch({ type: userActions.COMPLETE_TODO, payload: todoId });
//     };
// }

export function editHuman(todoId: number): humanAction {
    return {
        type: userActions.UPDATE_HUMAN,
        payload: todoId,
    };
}

export function deleteHuman(todoId: string): humanAction {
    return {
        type: userActions.DELETE_HUMAN,
        payload: todoId,
    };
}
