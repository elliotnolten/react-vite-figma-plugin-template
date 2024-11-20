import * as React from "react";

export function Screenshot({ image }: { image: string | null }) {
	if (!image) return null;

	return (
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
