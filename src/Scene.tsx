import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
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
			>
				<OrbitControls enablePan />
				<ambientLight intensity={5} />
				<pointLight position={[1, 1, 1]} intensity={5} />
				<Model position={[0, -1, 0]} />
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
