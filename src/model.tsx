import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
	nodes: {
		ProcessedMeshNode: THREE.Mesh;
	};
	materials: {
		material_0: THREE.MeshStandardMaterial;
	};
};

const dimmaURL =
	"https://web-api.ikea.com/dimma/assets/geomagical/59270066/PS01_S01_NV01/simple/glb_draco/G-59270066-3bf24fdc38be0ae69cd798924e119642c2f12a12_07cc334f67ea4fc496eee39296c20210.glb?cn=ingka-design";

const dimmaProxy = `http://localhost:8080/get-dimma-model?url=${dimmaURL}`;

export function Model(props: JSX.IntrinsicElements["group"]) {
	const { scene } = useGLTF(dimmaProxy) as GLTFResult;
	return <primitive object={scene} {...props} scale={1} />;
}

useGLTF.preload(dimmaProxy);
