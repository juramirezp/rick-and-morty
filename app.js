let selectedCharacter;
let nextPage;
let htmlForInyect;

function _id(id){
    return document.getElementById(id);
}

function inyectHtml(data, id, action){
    if(action==='new'){
        htmlForInyect=''
    }
    for(i=0;i<data.results.length;i++){
        htmlForInyect += `
        <div class="card">
        <img src="${data.results[i].image}" alt="">
        <h3>${data.results[i].name}</h3>
        <button onclick="verFicha(${data.results[i].id})">Ver detalle</button>
        </div>`;
    }
    _id(id).innerHTML=htmlForInyect;
}

fetch('https://rickandmortyapi.com/api/character/')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        nextPage=data.info.next;
        inyectHtml(data, 'personajes', 'new');
    })
    .catch(function(err) {
        console.error(err);
    });

const btnMoreData=_id('more');
btnMoreData.addEventListener('click',()=>{
    fetch(nextPage)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            nextPage=data.info.next;
            inyectHtml(data, 'personajes', 'add');
        })
        .catch(function(err) {
            console.error(err);
        });
});

function verFicha(id){
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            const aside=_id('detail-character');
            const ficha=_id('ficha');
            aside.style.display='block';
            ficha.innerHTML = `
                <img src="${data.image}" alt="">
                <h2>${data.name}</h2>
                <p>Estado: ${data.status}</p>
                <p>Genero: ${data.gender}</p>
                <p>Especie: ${data.species}</p>
            `;
        })
        .catch(function(err) {
            console.error(err);
        });
}

const btnCloseAside=_id('close-aside');
btnCloseAside.addEventListener('click',()=>{
    const aside=_id('detail-character');
    aside.style.display='none';
});