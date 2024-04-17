class Eraser{
    constructor(posX, posY, context){
        this.posX=posX
        this.posY=posY
        this.context=context
    }

    borrar(x, y, width, height){
        context.clearRect(x, y, width, height);
    }
}