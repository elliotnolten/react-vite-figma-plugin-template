import * as THREE from "three";

export function CaptureButton({
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
        // Create a temporary WebGL render target
        const renderTarget = new THREE.WebGLRenderTarget();

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

    if (!gl || !scene || !camera) return null;

    return (
        <button
            className="button button--primary"
            onClick={captureImage}
            style={{ position: "absolute", bottom: 10 }}
        >
            Take screenshot
        </button>
    );
}
