import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
    Box,
    OrbitControls,
    PerspectiveCamera,
    Plane,
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
            >
                <PerspectiveCamera makeDefault position={[2, 1, 2]} />
                <OrbitControls enablePan />
                <ambientLight intensity={1} />
                <pointLight position={[1, 1, 1]} intensity={5} castShadow />
                <directionalLight
                    intensity={1}
                    position={[0, 1, 0]}
                    castShadow
                />
                <Model position={[0, 0, 0]} />
                <Plane
                    args={[1000, 1000]}
                    position={[0, -0.01, -1]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    receiveShadow
                >
                    <meshStandardMaterial
                        attach="material"
                        color="transparent"
                    />
                </Plane>
                {/* <axesHelper args={[1]} />; */}
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
