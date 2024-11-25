import { useState, useEffect } from "react";
import { useAppState, useAppDispatch } from "./shared/context/useAppContext";

type Model = {
	productName: string;
	typeName: string;
	models: [{ uri: string }];
};

export function List() {
	const [models, setModels] = useState<Model[]>([]);
	const dispatch = useAppDispatch();
	const state = useAppState();

	const fetchModels = async (url: string) => {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	};

	useEffect(() => {
		fetchModels("http://localhost:8080/get-dimma-list")
			.then((data) => {
				setModels(data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<aside style={{ width: "20%", display: "flex" }}>
			<ul
				style={{ listStyle: "none", padding: 0, margin: 0, textAlign: "left" }}
			>
				{models.map((model, index) => {
					const { productName, typeName, models } = model;

					const { uri } = models[0];
					return (
						<li key={index}>
							<a
								href="#"
								onClick={() =>
									dispatch({ type: "SET_MODEL_URI", payload: uri })
								}
							>
								<p>{productName}</p>
							</a>
						</li>
					);
				})}
			</ul>
		</aside>
	);
}
