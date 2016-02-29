/*
 * @copyright Adam Benda, 2016
 */


var Man = function () {
    PIXI.Container.call(this);

    //Load our man texture
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "manGfx");
    this.canvas.style.display = "none";
    document.body.appendChild(this.canvas);
    canvg("manGfx", "gfx/man.svg");

    var ctx = this.canvas.getContext('2d');
    this.pixels = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

    this.texture = PIXI.Texture.fromCanvas(this.canvas, PIXI.SCALE_MODES.LINEAR);
    var spr = new PIXI.Sprite(this.texture);
    this.addChild(spr);
    
    this.width = this.canvas.width;
    this.height = this.canvas.height;
};
Man.prototype = Object.create(PIXI.Container.prototype);

Man.prototype.render = function () {
    canvg('gameArea', "gfx/man.svg",
            {offsetX: 10,
                offsetY: 10,
                scaleWidth: this.width,
                scaleHeight: this.height,
                ignoreDimensions: true
            });
};