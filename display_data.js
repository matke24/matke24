"use strict";

const MIN = 0;
const MAX = 1008;


let random_number_generator = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function display(){
    let random_num = random_number_generator(MIN, MAX);
    let url = `https://pokeapi.co/api/v2/pokemon/${random_num}`;
    let root = document.querySelector(":root")

    let form_name = document.getElementById("form_name")
    let ab_name = document.getElementById("ab_name")
    let doc_height = document.getElementById("doc_height")
    let doc_weight = document.getElementById("doc_weight")

    form_name.innerText = "loading..."
    ab_name.innerText = "loading..."
    doc_height.innerText = "loading..."
    doc_weight.innerText = "loading..."
    root.style.setProperty("--image", "default.png")

    fetch(url)
        .then((response) => response.json()) // transform response to JSON 
        .then((pokemon) => {
            let form = pokemon['name']
            let ability = pokemon['abilities'][0]['ability']['name']
            let height = pokemon['height']
            let weight = pokemon['weight']
            let image = pokemon['sprites']['other']['official-artwork']['front_default']

            form_name.innerText = form
            ab_name.innerText = ability
            doc_height.innerText = height
            doc_weight.innerText = weight
            if(image != null){
                root.style.setProperty("--image", `url(${image})`)
            }else{
                root.style.setProperty("--image", "url('default.png')")
            }
        })
        
}

let element = document.getElementById("btn_select")

element.addEventListener("click", display);


