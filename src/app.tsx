import { Canvas, useThree } from "@react-three/fiber";
import "./App.sass";
import { CameraControls, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Model } from "./model";
import { useState } from "react";

export default function App() {
	const [image, setImage] = useState<string | null>(null);
	const [gl, setGl] = useState<THREE.WebGLRenderer | null>(null);
	const [scene, setScene] = useState<THREE.Scene | null>(null);
	const [camera, setCamera] = useState<THREE.Camera | null>(null);

	return (
		<main style={{ position: "relative" }}>
			<Canvas
				gl={{ preserveDrawingBuffer: true }}
				onCreated={({ gl, scene, camera }) => {
					setGl(gl);
					setScene(scene);
					setCamera(camera);
				}}
			>
				<OrbitControls enablePan />
				<ambientLight intensity={5} />
				<pointLight position={[1, 1, 1]} intensity={5} />
				<Model position={[0, -1, 0]} />
			</Canvas>
			{image && (
				<img
					src={image}
					style={{
						position: "absolute",
						width: 200,
						height: 200,
						bottom: 10,
						left: 10,
					}}
					draggable="true"
					onDragEnd={(e) => {
						if (!e?.view) return;

						const frame = document.getElementById("root");
						const { clientX, clientY } = e;

						if (!isOutsideFrame(clientX, clientY, frame)) return;

						window.parent.postMessage(
							{
								pluginDrop: {
									clientX,
									clientY,
									items: [{ type: "image", data: image }],
								},
							},
							"*"
						);
					}}
				/>
			)}
			{gl && scene && camera && (
				<CaptureButton
					setImageUrl={setImage}
					gl={gl}
					scene={scene}
					camera={camera}
				/>
			)}
		</main>
	);
}

function isOutsideFrame(clientX: number, clientY: number, frame: any) {
	const rect = frame.getBoundingClientRect();
	console.log({ rect, clientX, clientY });
	return (
		clientX < rect.left ||
		clientX > rect.right ||
		clientY < rect.top ||
		clientY > rect.bottom
	);
}

function CaptureButton({
	setImageUrl: setImageUrl,
	gl,
	scene,
	camera,
}: {
	setImageUrl: (url: string) => void;
	gl: THREE.WebGLRenderer;
	scene: THREE.Scene;
	camera: THREE.Camera;
}) {
	const captureImage = () => {
		const width = 4096 * 2; // Desired width of the image
		const height = 4096 * 2; // Desired height of the image

		// Create a temporary WebGL render target
		const renderTarget = new THREE.WebGLRenderTarget(width, height);

		// Clear the render target
		gl.setRenderTarget(renderTarget);
		gl.clear();

		// Render the scene
		gl.render(scene, camera);

		// Capture the image as a data URL
		const imageDataUrl = gl.domElement.toDataURL("image/png");

		// Reset the renderer to its original state
		gl.setRenderTarget(null);

		// Store the image URL in state
		setImageUrl(imageDataUrl);
	};

	return (
		<button onClick={captureImage} style={{ position: "absolute", bottom: 10 }}>
			Take screenshot
		</button>
	);
}
