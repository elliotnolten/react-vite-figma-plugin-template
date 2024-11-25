import { useContext } from "react";
import { State } from "./types";
import { StateContext, DispatchContext } from "./AppContext";

export const useAppState = (): State => {
	const context = useContext(StateContext);
	if (!context) {
		throw new Error("useAppState must be used within an AppProvider");
	}

	return context;
};

export const useAppDispatch = () => {
	const context = useContext(DispatchContext);
	if (!context) {
		throw new Error("useAppDispatch must be used within an AppProvider");
	}
	return context;
};
