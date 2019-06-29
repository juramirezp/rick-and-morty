let dataApi;
let selectedCharacter;

fetch('https://rickandmortyapi.com/api/character/')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        dataApi=data;
        for(i=0;i<dataApi.results.length;i++){
            document.getElementById('personajes').innerHTML += `
            <div class="card">
            <img src="${dataApi.results[i].image}" alt="">
            <p>Estado: ${dataApi.results[i].status}</p>
            <p>Especie: ${dataApi.results[i].species}</p>
            </div>`;
        }
        console.log(dataApi);
    })
    .catch(function(err) {
        console.error(err);
    });

const btnMoreData=document.getElementById('more');
btnMoreData.addEventListener('click',()=>{
    fetch(dataApi.info.next)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            for(i=0;i<data.results.length;i++){
                document.getElementById('personajes').innerHTML += `
                <div class="card">
                <img src="${data.results[i].image}" alt="">
                <p>Estado: ${data.results[i].status}</p>
                <p>Especie: ${data.results[i].species}</p>
                </div>`;
            }
        })
        .catch(function(err) {
            console.error(err);
        });
});
