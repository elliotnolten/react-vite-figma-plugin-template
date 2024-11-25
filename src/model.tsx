import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useAppState } from "./shared/context/useAppContext";

type GLTFResult = GLTF & {
	nodes: {
		ProcessedMeshNode: THREE.Mesh;
	};
	materials: {
		material_0: THREE.MeshStandardMaterial;
	};
};

const dimmaURL =
	"https://web-api.ikea.com/dimma/assets/1.2/90472830/PS01_S01_NV01/rqp3/glb_draco/90472830_PS01_S01_NV01_RQP3_3.0_e105e50136c549a891fa305609e4b2a7.glb?cn=elliot.nolten";

export function Model(props: JSX.IntrinsicElements["group"]) {
	const state = useAppState();
	console.log(state);
	const dimmaProxy = `http://localhost:8080/get-dimma-model?url=${state.uri}`;
	const { scene } = useGLTF(dimmaProxy) as GLTFResult;
	return <primitive object={scene} {...props} scale={1} />;
}

// useGLTF.preload(dimmaProxy);
