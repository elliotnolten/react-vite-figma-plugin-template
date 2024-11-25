import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
	AccumulativeShadows,
	CameraControls,
	OrbitControls,
	PerspectiveCamera,
	RandomizedLight,
} from "@react-three/drei";
import * as THREE from "three";
import { Model } from "./model";
import { CaptureButton } from "./CaptureButton";
import { Screenshot } from "./Screenshot";

export function Scene() {
	const [image, setImage] = useState<string | null>(null);
	const [gl, setGl] = useState<THREE.WebGLRenderer | null>(null);
	const [scene, setScene] = useState<THREE.Scene | null>(null);
	const [camera, setCamera] = useState<THREE.Camera | null>(null);

	return (
		<div className="scene" style={{ flexGrow: 1, aspectRatio: "1 / 1" }}>
			<Canvas
				gl={{ preserveDrawingBuffer: true }}
				onCreated={({ gl, scene, camera }) => {
					setGl(gl);
					setScene(scene);
					setCamera(camera);
					gl.setPixelRatio(window.devicePixelRatio);
				}}
				shadows
				camera={{ position: [0, 0, 5], fov: 60 }}
			>
				<PerspectiveCamera makeDefault position={[0, 0, 5]} />
				<OrbitControls enablePan />
				<ambientLight intensity={5} />
				<pointLight position={[1, 1, 1]} intensity={5} />
				<Model position={[0, -1, 0]} />
				<AccumulativeShadows
					temporal
					frames={100}
					color="#9d4b4b"
					colorBlend={0.5}
					alphaTest={0.9}
					scale={20}
				>
					<RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
				</AccumulativeShadows>
			</Canvas>
			<Screenshot image={image} />
			{gl && scene && camera && (
				<CaptureButton
					setImageUrl={setImage}
					gl={gl}
					scene={scene}
					camera={camera}
				/>
			)}
		</div>
	);
}
