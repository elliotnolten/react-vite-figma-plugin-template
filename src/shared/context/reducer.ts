import { State, Action } from "./types";

export const reducer = (state: State, action: Action) => {
	switch (action.type) {
		case "SET_MODEL_URI":
			return { ...state, uri: action.payload };
		default:
			return state;
	}
};
