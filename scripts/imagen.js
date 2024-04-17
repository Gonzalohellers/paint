class Imagen{
    constructor(context, width, height){
        this.context=context;
        this.width=width;
        this.height=height;
        this.load=false;
        this.imageData=null
    }

    loadImage(url) {
        let miImage = new Image();
        miImage.onload = () => {
            this.loaded = true;
            this.imageData = miImage;
            this.context.drawImage(miImage, 0, 0, this.width, this.height);
        };
        miImage.src = url;
    }

    escalaDeGrises(){
        let imageData=this.context.getImageData(0, 0, this.width, this.height);

        for(let pixel=0; pixel<imageData.data.length; pixel+=4){
            let media=(imageData.data[pixel+0]+imageData.data[pixel+1]+imageData.data[pixel+2])/3
            imageData.data[pixel+0]=media
            imageData.data[pixel+1]=media
            imageData.data[pixel+2]=media
        }

        this.context.putImageData(imageData, 0, 0);
    }

    monocrome(){
        let imageData=this.context.getImageData(0, 0, this.width, this.height);
        let promedio=0
        for(let pixel=0; pixel<imageData.data.length; pixel+=4){
            let media=(imageData.data[pixel+0]+imageData.data[pixel+1]+imageData.data[pixel+2])/3
            if(media>128){
                promedio=255;
            }
            else{
                promedio=0;
            }
            imageData.data[pixel+0]=promedio
            imageData.data[pixel+1]=promedio
            imageData.data[pixel+2]=promedio
        }

        this.context.putImageData(imageData, 0, 0);
    }

    negativo(){
        let imageData=this.context.getImageData(0, 0, this.width, this.height);
        for(let pixel=0; pixel<imageData.data.length; pixel+=4){
            imageData.data[pixel+0]=255-imageData.data[pixel+0]
            imageData.data[pixel+1]=255-imageData.data[pixel+1]
            imageData.data[pixel+2]=255-imageData.data[pixel+2]
        }
        this.context.putImageData(imageData, 0, 0);
    }

}