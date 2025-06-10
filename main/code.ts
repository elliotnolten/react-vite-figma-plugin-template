figma.showUI(__html__, { themeColors: true, width: 880, height: 640 });

// @ts-ignore
figma.on("drop", (event: DropEvent) => {
    console.log(event);
    const { x, y, items } = event;
    figma.createImageAsync(items[0].data).then((image: Image) => {
        const node = figma.createRectangle();
        node.x = x;
        node.y = y;
        node.resize(1280, 1280);
        node.fills = [
            { type: "IMAGE", scaleMode: "FILL", imageHash: image.hash },
        ];
    });
});

figma.ui.onmessage = (msg) => {};
