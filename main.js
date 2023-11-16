import {render,fetchByCountryName} from "./script.js";
        
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const countryCard = document.getElementById("countryCard");
const israel_btn = document.getElementById("israel_btn");
const usa_btn = document.getElementById("usa_btn");
const thailand_btn = document.getElementById("thailand_btn");
const france_btn = document.getElementById("france_btn");


const searchCountry = async (event, searchValue) => {
    event.preventDefault();
    await fetchByCountryName(searchValue)
        .then(res => {
            countryCard.innerHTML = "";
            render(countryCard, res[0]);

        })
        .catch(() => {alert("The state dosnt exist!")});
}

searchForm.addEventListener("submit", (event) => {
    searchCountry(event, searchInput.value);
});          
israel_btn.addEventListener("click", (event) => {
    searchCountry(event, "israel");
});          

usa_btn.addEventListener("click", (event) => {
    searchCountry(event, "usa");
});          
thailand_btn.addEventListener("click", (event) => {
    searchCountry(event, "thailand");
});          
france_btn.addEventListener("click", (event) => {
    searchCountry(event, "france");
});          

export { searchCountry};


