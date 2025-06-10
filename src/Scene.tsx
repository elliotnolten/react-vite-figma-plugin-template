import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import * as THREE from "three";
import { Model } from "./model";
import { CaptureButton } from "./CaptureButton";
import { Screenshot } from "./Screenshot";

export function Scene() {
    const [image, setImage] = useState<string | null>(null);
    const [gl, setGl] = useState<THREE.WebGLRenderer | null>(null);
    const [scene, setScene] = useState<THREE.Scene | null>(null);
    const [camera, setCamera] = useState<THREE.Camera | null>(null);

    if (gl) {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
        gl.setPixelRatio(4);
    }

    return (
        <div className="scene" style={{ flexGrow: 1, aspectRatio: "1 / 1" }}>
            <Canvas
                gl={{ preserveDrawingBuffer: true, alpha: true }}
                onCreated={({ gl, scene, camera }) => {
                    setGl(gl);
                    setScene(scene);
                    setCamera(camera);
                }}
                shadows
            >
                <PerspectiveCamera makeDefault position={[2, 1, 2]} />
                <OrbitControls enablePan />
                <ambientLight intensity={1} />
                <spotLight
                    position={[1, 2, 1]}
                    intensity={3.5}
                    castShadow
                    shadow-radius={10}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={100}
                    shadow-camera-near={0.1}
                />
                <directionalLight
                    intensity={1.5}
                    position={[0, 1, 1]}
                    castShadow
                    shadow-radius={10}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />
                <Model position={[0, 0, 0]} />
                <Plane
                    args={[1000, 1000]}
                    position={[0, 0, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    receiveShadow
                >
                    <shadowMaterial
                        attach="material"
                        transparent
                        opacity={0.2}
                    />
                    {/* <meshStandardMaterial attach="material" color="white" /> */}
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
