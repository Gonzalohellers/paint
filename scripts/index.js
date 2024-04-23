// Importo elementos del DOM necesarios
const canvas = document.getElementById("canvas"); // Obtener el lienzo
const ctx = canvas.getContext("2d"); // Obtener el contexto de dibujo 2D del lienzo
const canvasWidth = canvas.width; // Ancho del lienzo
const canvasHeight = canvas.height; // Alto del lienzo

// Obtener elementos del DOM para interactuar con ellos
const pencilBtn = document.getElementById("pencil"); // Botón de lápiz
const eraserBtn = document.getElementById("eraser"); // Botón de borrador
const pencilDiv = document.getElementById("penDiv"); // Div contenedor de herramientas de dibujo
const selectorColor = document.getElementById("selectorColor"); // Selector de color
const selectorWidth = document.getElementById("selectorWidth"); // Selector de ancho de lápiz
const fileInput = document.getElementById("btnoriginal"); // Selector de archivo
const save = document.getElementById("Save"); // Botón de guardar
const byNFilter = document.getElementById("b&wfilter"); // Botón de filtro blanco y negro
const monocrome = document.getElementById("monocromeFilter"); // Botón de filtro monocromo
const borders = document.getElementById("borders"); // Botón de detección de bordes
const blur = document.getElementById("blur"); // Botón de desenfoque

// Componentes del lápiz
let miPencil = null; // Objeto lápiz
let color; // Color del lápiz
let pencilWidth; // Ancho del lápiz

let mouseUp = true; // Estado del botón del mouse (levantado o no)
let mouseDown = false; // Estado del botón del mouse (presionado o no)
let pencilClick = false; // Estado del lápiz (activado o desactivado)

let miImage; // Objeto imagen para manipulación de imágenes

// Función principal
function main() {
    miImage = new Imagen(ctx, canvas.width, canvas.height); // Inicializar objeto imagen con el contexto del lienzo y dimensiones
}

// Event listeners

// Al presionar el mouse en el lienzo
canvas.addEventListener("mousedown", (e) => {
    mouseUp = false; // Actualizar estado del botón del mouse
    mouseDown = true; // Actualizar estado del botón del mouse
    miPencil = new Pencil(e.offsetX, e.offsetY, color, ctx, pencilWidth); // Crear un nuevo objeto lápiz con posición inicial, color y ancho
})

// Al soltar el mouse en el lienzo
canvas.addEventListener("mouseup", () => {
    mouseUp = true; // Actualizar estado del botón del mouse
    mouseDown = false; // Actualizar estado del botón del mouse
    miPencil = null; // Reiniciar objeto lápiz
})

// Al seleccionar un color en el selector de color
selectorColor.addEventListener("input", () => {
    color = selectorColor.value; // Actualizar el color del lápiz con el valor seleccionado
})

// Al seleccionar un archivo en el selector de archivos
fileInput.addEventListener("input", (e) => {
    const selectedFile = e.target.files[0]; // Obtener el archivo seleccionado
    if (selectedFile) {
        const imageUrl = URL.createObjectURL(selectedFile); // Crear una URL del archivo seleccionado
        miImage.loadImage(imageUrl); // Cargar la imagen en el lienzo
        e.target.value = null; // Reiniciar el valor del selector de archivos para permitir seleccionar el mismo archivo nuevamente
    }
})

// Al hacer clic en el botón de guardar
save.addEventListener("click", (e) => {
    let link = document.createElement("a"); // Crear un elemento de enlace
    link.download = canvas.png; // Establecer el nombre de descarga
    link.href = canvas.toDataUrl(); // Establecer la URL de descarga como una imagen del lienzo
    link.click(); // Simular clic en el enlace para iniciar la descarga
})

// Al seleccionar un ancho de lápiz en el selector de ancho
selectorWidth.addEventListener("input", () => {
    pencilWidth = selectorWidth.value; // Actualizar el ancho del lápiz con el valor seleccionado
})

// Interactividad para mostrar el selector de color al pasar sobre el contenedor de herramientas de dibujo
pencilDiv.addEventListener("mouseenter", () => {
    selectorColor.style.visibility = "visible"; // Mostrar el selector de color
})

// Interactividad para ocultar el selector de color al salir del contenedor de herramientas de dibujo
pencilDiv.addEventListener("mouseleave", () => {
    selectorColor.style.visibility = "hidden"; // Ocultar el selector de color
})

// Al mover el mouse sobre el lienzo
canvas.addEventListener('mousemove', function (evento) {
    if (miPencil && pencilClick) { // Si hay un objeto lápiz y el lápiz está activado
        miPencil.moveTo(evento.offsetX, evento.offsetY); // Mover el lápiz a la posición actual del mouse
        miPencil.draw(); // Dibujar con el lápiz
    }
});

// Al hacer clic en el botón de lápiz
pencilBtn.addEventListener("click", () => {
    if (!pencilClick) { // Si el lápiz no está activado
        pencilClick = true; // Activar el lápiz
        pencilBtn.classList.add("clicked"); // Agregar clase CSS para indicar que está activado
    }
    else{
        pencilClick=false; // Desactivar el lápiz
        pencilBtn.classList.remove("clicked"); // Quitar clase CSS para indicar que está desactivado
    }
})

// Al hacer clic en el botón de filtro blanco y negro
byNFilter.addEventListener("click", () => {
    miImage.escalaDeGrises(); // Aplicar filtro de escala de grises a la imagen
})

// Al hacer clic en el botón de filtro monocromo
monocrome.addEventListener("click", () => {
    miImage.monocrome(); // Aplicar filtro monocromo a la imagen
})

// Al hacer clic en el botón de detección de bordes
borders.addEventListener("click", () => {
    miImage.detectEdges(); // Aplicar filtro de detección de bordes a la imagen
})

// Al hacer clic en el botón de desenfoque
blur.addEventListener("click", () => {
    miImage.applyBlur(); // Aplicar filtro de desenfoque a la imagen
})

// Llamada a la función principal para inicializar
main();
