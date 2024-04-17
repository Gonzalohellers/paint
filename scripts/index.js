//Importo elementos
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const pencilBtn = document.getElementById("pencil");
const eraserBtn = document.getElementById("eraser");
const pencilDiv = document.getElementById("penDiv");
const selectorColor = document.getElementById("selectorColor");
const selectorWidth=document.getElementById("selectorWidth");
const fileInput=document.getElementById("subirArchivo");
const save=document.getElementById("Save");
const byNFilter=document.getElementById("b&wfilter");
const monocrome=document.getElementById("monocromeFilter");

// Componentes del Pen
let miPencil = null;
let color;
let pencilWidth;

let mouseUp = true;
let mouseDown = false;
let pencilClick = false;

let miImage;

main()

function main(){
    miImage=new Imagen(ctx, canvas.width, canvas.height);
}

canvas.addEventListener("mousedown", (e) => {
    mouseUp = false;
    mouseDown = true;
    miPencil = new Pencil(e.offsetX, e.offsetY, color, ctx, pencilWidth);
})

canvas.addEventListener("mouseup", () => {
    mouseUp = true;
    mouseDown = false;
    miPencil = null;
})

selectorColor.addEventListener("input", () => {
    color = selectorColor.value;
})

fileInput.addEventListener("input", (e) =>  {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        const imageUrl = URL.createObjectURL(selectedFile);
        miImage.loadImage(imageUrl);
        // Reset the file input value to allow selecting the same file again
        e.target.value = null;
    }
})


save.addEventListener("click", (e)=>{
    let link=document.createElement("a");
    link.download=canvas.png;
    link.href=canvas.toDataUrl();
    link.click();
})

selectorWidth.addEventListener("input", ()=>{
    pencilWidth=selectorWidth.value;
})

//Interactividad para que el usuario elija la paleta de colores.
pencilDiv.addEventListener("mouseenter", () => {
    selectorColor.style.visibility = "visible";
})

pencilDiv.addEventListener("mouseleave", () => {
    selectorColor.style.visibility = "hidden";
})

canvas.addEventListener('mousemove', function (evento) {
    if (miPencil) {
        // Acceder a las propiedades del evento
        miPencil.moveTo(evento.offsetX, evento.offsetY)
        miPencil.draw();
    }
});


pencilDiv.addEventListener("click", () => {
    pencilClick = true;
})

byNFilter.addEventListener("click",()=>{
    miImage.escalaDeGrises();
})

monocrome.addEventListener("click", ()=>{
    miImage.monocrome()
})


