import { videot } from "../scripts/data.js";

const videos = JSON.parse(sessionStorage.getItem("videos")) || videot;

//Agregaremos el contenido deseado: 1. video del contenedor
const videoPlayerInfo = (contenedor, video) => {
    const figure = document.createElement("figure");
    figure.classList.add("main__figure");
    figure.innerHTML = `<iframe frameborder="0" class="card__video" src=${video.video} alt=${video.nombre}> </iframe>`;
    contenedor.appendChild(figure);

    //Insertar la info complementaria
    const list =document.createElement("ul");   
    list.classList.add('main__list');
    for (const key in video.seenIn) {
        console.log(key, " --->", video.seenIn[key]);
        const item = document.createElement("li");
        item.innerHTML = `${key}: ${video.seenIn[key]}`;
        list.appendChild(item);
    }
    contenedor.appendChild(list);
};

document.addEventListener("DOMContentLoaded",  () => {
    //Capturar la información que tenemos guardada en el session storage
    const idVideoStg = JSON.parse(sessionStorage.getItem("idVideo")) || 0;
    const idVideo = Number(idVideoStg);
    console.log(idVideo);
        
    //Hacer la búsqueda del video al cual le hemos dado click
    const video = videos.find((vid) => vid.id === idVideo);
    console.log(video);
    
    //Actualizar el título con el nombre del personaje
    const title = document.getElementById("title");
    title.innerHTML = video.nombre;

    //Capturar el contenedor donde le vamos a insertar toda la información del video
    const infoVideoContainer = document.getElementById("information");
    //Ejecutamos la función que nos va a inyectar la información detallada del personaje
    videoPlayerInfo(infoVideoContainer, video)
})
