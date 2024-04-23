class Imagen {
    constructor(context, width, height) {
        this.context = context; // Contexto de dibujo 2D del lienzo
        this.width = width; // Ancho de la imagen
        this.height = height; // Alto de la imagen
        this.load = false; // Estado de carga de la imagen
        this.imageData = null; // Datos de la imagen
    }

    // Método para cargar una imagen desde una URL
    loadImage(url) {
        let miImage = new Image(); // Crear un nuevo objeto de imagen
        miImage.onload = () => {
            this.loaded = true; // Marcar la imagen como cargada
            this.imageData = miImage; // Guardar los datos de la imagen
            this.context.drawImage(miImage, 0, 0, this.width, this.height); // Dibujar la imagen en el lienzo
        };
        miImage.src = url; // Establecer la URL de la imagen
    }

    // Método para convertir la imagen a escala de grises
    escalaDeGrises() {
        let imageData = this.context.getImageData(0, 0, this.width, this.height); // Obtener los datos de píxeles de la imagen

        // Iterar sobre cada píxel de la imagen y calcular la media de los componentes RGB
        for (let pixel = 0; pixel < imageData.data.length; pixel += 4) {
            let media = (imageData.data[pixel + 0] + imageData.data[pixel + 1] + imageData.data[pixel + 2]) / 3;
            imageData.data[pixel + 0] = media; // Canal rojo
            imageData.data[pixel + 1] = media; // Canal verde
            imageData.data[pixel + 2] = media; // Canal azul
        }

        this.context.putImageData(imageData, 0, 0); // Aplicar los cambios a la imagen en el lienzo
    }

    // Método para convertir la imagen a monocromo
    monocrome() {
        let imageData = this.context.getImageData(0, 0, this.width, this.height); // Obtener los datos de píxeles de la imagen
        let promedio = 0;

        // Iterar sobre cada píxel de la imagen
        for (let pixel = 0; pixel < imageData.data.length; pixel += 4) {
            let media = (imageData.data[pixel + 0] + imageData.data[pixel + 1] + imageData.data[pixel + 2]) / 3;

            // Si el valor de la media es mayor que 128, asignar 255 (blanco), de lo contrario, asignar 0 (negro)
            if (media > 128) {
                promedio = 255;
            } else {
                promedio = 0;
            }

            imageData.data[pixel + 0] = promedio; // Canal rojo
            imageData.data[pixel + 1] = promedio; // Canal verde
            imageData.data[pixel + 2] = promedio; // Canal azul
        }

        this.context.putImageData(imageData, 0, 0); // Aplicar los cambios a la imagen en el lienzo
    }

    // Método para convertir la imagen a negativo
    negativo() {
        let imageData = this.context.getImageData(0, 0, this.width, this.height); // Obtener los datos de píxeles de la imagen

        // Iterar sobre cada píxel de la imagen y calcular el negativo
        for (let pixel = 0; pixel < imageData.data.length; pixel += 4) {
            imageData.data[pixel + 0] = 255 - imageData.data[pixel + 0]; // Canal rojo
            imageData.data[pixel + 1] = 255 - imageData.data[pixel + 1]; // Canal verde
            imageData.data[pixel + 2] = 255 - imageData.data[pixel + 2]; // Canal azul
        }

        this.context.putImageData(imageData, 0, 0); // Aplicar los cambios a la imagen en el lienzo
    }

    // Método para detectar bordes en la imagen
    detectEdges() {
        let imageData = this.context.getImageData(0, 0, canvas.width, canvas.height); // Obtener los datos de píxeles de la imagen
        let data = imageData.data;

        // Aplicar el filtro de detección de bordes (operador de Sobel)
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                let index = (y * canvas.width + x) * 4;
                let gray = (data[index] + data[index + 1] + data[index + 2]) / 3;
                data[index] = data[index + 1] = data[index + 2] = gray;
            }
        }

        // Aplicar el efecto de bordes
        for (let y = 1; y < canvas.height - 1; y++) {
            for (let x = 1; x < canvas.width - 1; x++) {
                let index = (y * canvas.width + x) * 4;
                let gx = (
                    -data[index - 4] - 2 * data[index - 3] - data[index - 2] +
                    data[index + 2] + 2 * data[index + 3] + data[index + 4]
                );
                let gy = (
                    -data[index - 4] - 2 * data[index] - data[index + 4] +
                    data[index - (canvas.width * 4)] + 2 * data[index - (canvas.width * 4) + 1] + data[index - (canvas.width * 4) + 2]
                );
                let magnitude = Math.sqrt(gx * gx + gy * gy);
                data[index] = data[index + 1] = data[index + 2] = magnitude;
            }
        }

        this.context.putImageData(imageData, 0, 0); // Aplicar los cambios a la imagen en el lienzo
    }

    // Método para aplicar un filtro de desenfoque a la imagen
    applyBlur() {
        var imageData = this.context.getImageData(0, 0, canvas.width, canvas.height); // Obtener los datos de píxeles de la imagen
        var data = imageData.data;
        var tempData = new Uint8ClampedArray(data.length); // Crear un nuevo arreglo para almacenar temporalmente los datos filtrados

        var cantPixels = 3; // Tamaño del kernel del filtro de media

        // Iterar sobre cada píxel en la imagen
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                let index = (y * canvas.width + x) * 4;
                let r = 0,
                    g = 0,
                    b = 0;

                // Iterar sobre los píxeles vecinos para calcular la media
                for (let ky = -cantPixels; ky <= cantPixels; ky++) {
                    for (let kx = -cantPixels; kx <= cantPixels; kx++) {
                        let pixelY = y + ky;
                        let pixelX = x + kx;

                        // Verificar límites de la imagen
                        if (pixelY >= 0 && pixelY < canvas.height && pixelX >= 0 && pixelX < canvas.width) {
                            let currentIndex = (pixelY * canvas.width + pixelX) * 4;
                            r += data[currentIndex];
                            g += data[currentIndex + 1];
                            b += data[currentIndex + 2];
                        }
                    }
                }

                // Calcular el valor promedio de los píxeles vecinos
                let numPixels = (2 * cantPixels + 1) * (2 * cantPixels + 1);
                tempData[index] = Math.floor(r / numPixels);
                tempData[index + 1] = Math.floor(g / numPixels);
                tempData[index + 2] = Math.floor(b / numPixels);
                tempData[index + 3] = data[index + 3]; // Mantener el canal alfa
            }
        }

        // Copiar los datos filtrados de vuelta a imageData
        for (var i = 0; i < data.length; i++) {
            data[i] = tempData[i];
        }

        this.context.putImageData(imageData, 0, 0); // Aplicar los cambios a la imagen en el lienzo
    }
}
