import { searchCountry} from "./main.js";


const fetchByCountryName = async (countryName) => {
    const res = await axios.get('https://restcountries.com/v3.1/name/' + countryName);
    return await res.data;
}

const fetchByCountryCode = async (countryName) => {
    const res = await axios.get('https://restcountries.com/v3.1/alpha/' + countryName);
    return await res.data;
}


const present_map=(name_of_cuntry,x,y,pop)=>{
    
    let zoom =6;
    if (pop>100000000)
    {
        zoom =3;
    }
    var cuntryCoordinates = [x,y];
    var map = L.map('map').setView(cuntryCoordinates, zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
    {attribution: '© OpenStreetMap contributors'}).addTo(map);
    L.marker(cuntryCoordinates).addTo(map).bindPopup(name_of_cuntry);

}

const createCountryCard =  (country) => {

    const card1 = document.createElement("div");

    //card.classList.add("countryCard");
    card1.innerHTML = `<div class = "card1 p-3 "><img  src=${country.flags.png} width="100">
    <h4>${country.name.common}</h4>    
    <p>
    pop: ${country.population}
    <br>
    region: ${country.region}
    <br>
    languages: ${Object.values(country.languages)}
    <br>
    coin: ${Object.values(country.currencies)[0]['name']}
    <br>
    capial: ${country.capital}
    <br>
    <br>
    <b>States with borders:</b>
    </p>
    `
    country.borders.map(async(nameb)=>{
        const res = await fetchByCountryCode(nameb);
        console.log(res);
        card1.innerHTML +=`<button type="button" id = "${res[0].name.common}"class="btn_border" >${res[0].name.common}</button>
    `})
  
    card1.innerHTML +=`</div>`
   
    setTimeout(() => {
        const btn_borders = document.querySelectorAll(".btn_border")
        console.log(btn_borders);
        btn_borders.forEach(link=>{
            link.addEventListener("click",(e)=>
            {
                e.preventDefault();
                searchCountry(e, link.id);

            })
        }) 


      }, "500");


    const mapContainer=document.createElement("div");
    mapContainer.id="map";
    countryCard.appendChild(mapContainer);

    present_map(  country.name.common,country.latlng[0], country.latlng[1], country.population);
    return card1;
}


const render = (countryCard, country) => {

    countryCard.appendChild(createCountryCard(country));

}
export { present_map,createCountryCard,render,fetchByCountryName};

