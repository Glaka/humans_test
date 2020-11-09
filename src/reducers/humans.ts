import { userActions } from "../actions/actionTypes"

const initialState: any = {
}

const humanReducer = (
	state: any = initialState,
	action: any
): any => {
	switch (action.type) {
		case userActions.ADD_HUMAN:
			return {
				...state,
				[action.payload.id]: {
					name: action.payload.name
				}
			}
		case userActions.UPDATE_HUMAN:
			return {
				...state,
			}
		case userActions.GET_HUMANS:
			return {
				...state,
				...action.payload
			}
		case userActions.DELETE_HUMAN:
			const clearedState = { ...state };
			delete clearedState[action.payload];

			return {
				...clearedState,
			}
		default:
			return state
	}
}

export default humanReducer