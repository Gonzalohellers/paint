class Pencil {

    constructor(posX, posY, color, context, width) {
        this.befX=posX;
        this.befY=posY;
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.context = context;
        this.width=width;
    }

    selectColor(color){
        this.color=color;
    }

    moveTo(posX, posY) {
        this.befX = this.posX;
        this.befY = this.posY;
        this.posX = posX;
        this.posY = posY;
    }


    draw(){
        this.context.beginPath();
        this.context.strokeStyle = this.color;
        this.context.lineWidth = this.width;
        this.context.lineCap = 'round';
        this.context.moveTo(this.befX, this.befY);
        this.context.lineTo(this.posX, this.posY);
        this.context.stroke();
        this.context.closePath();
    }

}