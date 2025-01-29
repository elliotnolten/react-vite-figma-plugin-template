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

const dimmaProxy = "http://localhost:8080/get-dimma-model?url=";

export function Model(props: JSX.IntrinsicElements["group"]) {
    const state = useAppState();
    const { uri } = state;
    const modelURI = `${dimmaProxy}${uri}`;
    const { scene } = useGLTF(modelURI) as GLTFResult;

    scene.traverse((child) => {
        child.castShadow = true;
        child.receiveShadow = true;
    });

    return <primitive object={scene} {...props} scale={1} />;
}
