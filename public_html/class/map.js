/* 
 * @copyright Adam Benda, 2016
 * @license MIT
 */

var Map = function (svgFilename) {

    /* Load the collision map */

    //todo: use asynchronous loader
    //@see https://github.com/gabelerner/canvg 
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "collisionMap");
    this.canvas.style.display = "none";
    document.body.appendChild(this.canvas);
    canvg('collisionMap', svgFilename);

    var ctx = this.canvas.getContext('2d');
    this.pixels = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

    this.width = this.canvas.width;
    this.height = this.canvas.height;


};

/**
 * 
 * @param {int} x - absolute X in pixels from left
 * @param {int} y - absolute Y in pixels from top
 * @returns {undefined}
 */
Map.prototype.pixelIndex = function (x, y) {
    return y * this.height * 4 + x * 4; //index of RED channel
};

/**
 * Determine if on given pixel is part of map that collides.
 * 
 * @param {int} x - absolute X in pixels from left
 * @param {int} y - absolute Y in pixels from top
 * @returns {Boolean} - there is some colision on the map
 */
Map.prototype.collides = function (x, y) {
    var pixelBase = this.pixelIndex(x, y);
    if (this.pixels.data[pixelBase + 3] !== 0 &&
            (
                    this.pixels.data[pixelBase] < 255 ||
                    this.pixels.data[pixelBase + 1] < 255 ||
                    this.pixels.data[pixelBase + 2] < 255
                    )
            ) {
        //is not transparent and is not pure white
        return true;
    }
    return false;
};

/**
 * Determine if on given pixel area is part of map that collides.
 * 
 * @param {int} x - absolute X in pixels from left
 * @param {int} y - absolute Y in pixels from top
 * @param {int} width - width of the rectangle
 * @param {int} height - height of the rectangle
 * @returns {Boolean} - false if area is clear, true if (partly) collidable
 */
Map.prototype.collidesArea = function (x, y, width, height) {
    for (var j = y; j < y + height; y++) {
        for (var i = x; i < x + width; x++) {
            if (this.collides(i, j)) {
                return true;
            }
        }
    }
    //no colliding point was found
    return false;
};