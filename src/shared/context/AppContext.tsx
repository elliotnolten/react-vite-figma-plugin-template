import { createContext, Dispatch, useReducer } from "react";
import { Action, State } from "./types";
import { reducer } from "./reducer";
import { initState } from "./initState";

export const StateContext = createContext<State | undefined>(undefined);
export const DispatchContext = createContext<Dispatch<Action> | undefined>(
	undefined
);

type AppContextProps = {
	children: React.ReactNode;
};

export const AppContextProvider: React.FC<AppContextProps> = ({ children }) => {
	const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
		reducer,
		initState
	);

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				{children}
			</DispatchContext.Provider>
		</StateContext.Provider>
	);
};
