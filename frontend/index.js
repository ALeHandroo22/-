

// index.js
async function getAvailableSlots() {
    try {
        const response = await fetch('http://localhost:8000/Station_Management/receiving_stations');
        const data = await response.json();
        console.log('Свободные слоты:', data);
        return data;
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

getAvailableSlots().then((data)=>{
    console.log(data)

for (let i =0;i<data.length;i++){
    const div = document.getElementById('main-station-container')
    let element = document.createElement('div')
    element.innerHTML = `<div class="div-element">
                <h2>adress:${data[i].adress}</h2>
                <ul>
                    <li>power:${data[i].power}</li>
                    <li>connector_type:${data[i].connector_type}</li>
                    <li>number_of_slots:${data[i].number_of_slots}</li>
                    <li>status:${data[i].status}</li>
                </ul>
                
            </div>`
    div.appendChild(element)
    console.log("добавил")
}





})





// data.map((el)=>{
//     const div = document.getElementById('main-station-container')
//     div = createElement('div')

// })



