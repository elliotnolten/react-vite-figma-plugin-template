export type State = {
	uri: string;
};

export type Action = {
	type: "SET_MODEL_URI";
	payload: string;
};
