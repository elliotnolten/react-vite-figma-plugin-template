import "./App.sass";
import { List } from "./List";
import { Scene } from "./Scene";

export default function App() {
	return (
		<main
			style={{ position: "relative", display: "flex", flexDirection: "row" }}
		>
			<List />
			<Scene />
		</main>
	);
}
