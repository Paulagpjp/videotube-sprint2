import { videot } from "./data.js";
console.log(videot);

const videos = JSON.parse(sessionStorage.getItem("videos")) || videot;

const containerCards = document.querySelector(".main_cards");
console.log(containerCards);

const printVideos = (container, videoList) => {
    container.innerHTML = "";
    videoList.forEach((video) => {
        container.innerHTML += `
        <article class="cards">
            <figure class="cards__figure">
                <img class="cards__image" 
                data-card='cards' name=${video.id}
                src=${video.img} alt=${video.nombre}>
            </figure>
            <div class="flex-div">
                <figure>
                    <img src=${video.img}>
                </figure>
                <h3 class="cards__name" data-card='cards' name=${video.id}>${video.nombre}>${video.perfil}</h3>
            </div> 
            <p class="cards__views" name=${video.id}>${video.vistas}</p>           
        </article>
        `;
    });
};

//3. Vamos a escuchar al evento DomContentLoad y cuando suceda este evento se deben imprimir los personajes
document.addEventListener("DOMContentLoaded", () => {
    printVideos(containerCards, videos);
});

//4. Vamos a escuchar el evento click sobre las cards de los videos
document.addEventListener("click", (event) => {

    const dataCardAttribute = event.target.getAttribute("data-card");
    if (dataCardAttribute === "cards") {
        const id = event.target.getAttribute("name");
        sessionStorage.setItem("idVideo", JSON.stringify(id));
        window.location.href = "./pages/details.html";
    }
});

//5. Creamos un array con categorias de los videos
const categories = ["all"];
videos.forEach((item) => {
    if (!categories.includes(item.seenIn.Category)) {
        categories.push(item.seenIn.Category);
    }
});

categories.forEach((item) => {
    const filterButton = document.getElementsByName(item)[0];
  
    filterButton.addEventListener("click", () => {
      const filterVideos =
        item === "all"
          ? videos
          : videos.filter((element) => element.seenIn.category === item);
          printVideos(containerCards, filterVideos);
    });
});
//---------Búsqueda de personajes por nombre..
const filterByName = (termSearch,videosList) => {
    const filterVideos = videosList.filter((video) => 
    video.name.toLowerCase().includes(termSearch.toLowerCase())
    );
    
    const result = filterVideos.length 
    ? filterVideos 
    : videosList;

    const messageResult = filterVideos.length
        ? false
        : "No existe el video";

    return {
        resultSearch: result,
        messageSearch: messageResult,
    };
};

const formSearch = document.querySelector(".search-bar");

formSearch.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log(formSearch.children);

    const formChildren = Array.from(formSearch.children);

    const inputSearch = formChildren.find((item) => item.localName === "input");

    console.log(inputSearch.value);

    const searchTerm = inputSearch.value;

    if (searchTerm) {

        const searchResult = filterByName(searchTerm, videos);

        console.log(searchResult);

        printVideos(containerCards, searchResult.resultSearch);
    }
});