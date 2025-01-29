import "../node_modules/react-figma-plugin-ds/figma-plugin-ds.css";
import "./app.css";
import { List } from "./List";
import { Scene } from "./Scene";

export default function App() {
    return (
        <main
            style={{ position: "relative", overflow: "hidden", height: "100%" }}
            className="flex row align-items-stretch"
        >
            <List />
            <Scene />
        </main>
    );
}
