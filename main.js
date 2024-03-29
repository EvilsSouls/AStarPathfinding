"use strict";
const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");

const plane = new Plane(canvas, 20, 10);
const pathfinder = new Pathfinder(plane, "0,0", "0,0");

resizeCanvas(canvas);

plane.initialize("20,10;0x84412f55f6055107d557415567d55601150eff5700056fffc0");
plane.draw();

// Makes right clicking prevent default behaviour & if right mouse button is clicked gets start pos of path
canvas.addEventListener("contextmenu", e => {e.preventDefault()});
canvas.addEventListener("mousedown", e => {
    if(e.button === 2) {
        const node = plane.getNodeAtCoords(e.clientX, e.clientY);
        pathfinder.startNodeID = `${node.x},${node.y}`;
    }
});

// If event was right click, saves the node the mouse is currently over and stores it as the end node.
canvas.addEventListener("mouseup", e => {
    if(e.button === 2) {
        const node = plane.getNodeAtCoords(e.clientX, e.clientY);
        pathfinder.endNodeID = `${node.x},${node.y}`;
        pathfinder.initialize(100);
    }
});

// When there is a left click, changes the status of the node, the mouse is currently hovering over, from free to wall or from wall to free.
canvas.addEventListener("click", e => {
    if(e.button === 0) {
        const node = plane.getNodeAtCoords(e.clientX, e.clientY);
        plane.data[node.y][node.x].wall = (plane.data[node.y][node.x].wall) ? false:true;

        plane.data[node.y][node.x].draw(canvas.width / plane.amountX, canvas.height / plane.amountY, (plane.data[node.y][node.x].wall) ? "Black":"White");
    }
});

// TODO:
// - Clean up plane.getNodeAtCoords (To give a reference to the value, not copy the value itself)
// - Add back / Clean up the text code to show the fCost of the squares
// - Maybe even change it, so that each node has a wall to another node and instead of having either cell = wall or not you can have 4 walls individually change from on or off
// - Maybe replace this.canvas.width / this.amountX, this.canvas.height / this.amountY (to automatically calculate width and height of cell to draw cell) maybe to a method or something