import datos from "./data/athletes/athletes.js";
import { genderAll, computeDataTwo, functionAll, sortData, sortByAge, sortByName, allCountries, allSport } from "./data.js";

const arrayAthletes = datos.athletes;//aqui guardo la data de todos los atletas
const arrayCountries = sortData(Array.from(allCountries(arrayAthletes))).reverse();//array de paises
const arraySport = sortData(Array.from(allSport(arrayAthletes))).reverse();// array de dportes
const team = document.getElementById('team');//select de paises
const sport = document.getElementById('sport');//select de dorpote
const orderBySelect = document.getElementById('orderBySelect');//select para ordenar
const gender = document.getElementById('gender');

// codigo para crear las opciones de genero
let containerGender = document.querySelector('.containerGender');//form gender
  let g = Array.from(genderAll(arrayAthletes));
  for (let x = 0; x<g.length; x++) {
  let optionGender = document.createElement('option');
  optionGender.value= g[x];
  optionGender.innerHTML = g[x];
  containerGender.gender.appendChild(optionGender);
  console.log(optionGender, 'ay');
  }
// una funcion  que retorna con la plantilla de un solo atleta que es un string (es un html)
const generateAthleteTemplate = (athlete) => {

  const athletegender = athlete.gender === "F" ? "./imagenes/femolimpi.PNG" : "./imagenes/atletasmasculinos.jpg"
  return `<article class="sportsContainer">

    <h1 class="nameAthlete">${athlete.name}</h1>
    <section class="infoAthlete">
      <figure class="boxImgAthlete">
          <img class="classAthlete" src= ${athletegender}>
      </figure>
      <section class="tableAthletes">
            <p> Genero: ${athlete.gender}</p>
            <p> Altura: ${athlete.height}</p>
            <p> Deporte: ${athlete.sport}</p>
            <p> Peso: ${athlete.weight}</p>
            <p> Pais: ${athlete.team}</p>
            <p> Edad: ${athlete.age}</p>
            <p> Medalla: ${athlete.medal}</p>     
      </section>
    </section>  
  </article>`
}
// funcion que retorna plantilla de  optiones de los filtros
const generateOptionTemplate = (arrayF) => {

  return `<option value="${arrayF}"> ${arrayF} </option> `
}
// variable que tiene al opcion predeterminada de los select
const OptionselectedTemplate = `<option value="todos" selected="selected"> Todos </option>`;

//funcion para insertar las opciones de los dos select en html
const insertHtmArray = (elemet, htmlArray) => {

  elemet.innerHTML = OptionselectedTemplate + htmlArray;/*aqui voy a insertar mi plantilla que esta
 en generateOptionTemplate*/
}

//funcion para insertar los atletas en mi web.En mi id"gridForTest" inserto con innerHTML. 
const insertHtmlAtheles = (htmlAthletes) => {

  const grid = document.getElementById("gridForTest");
  grid.innerHTML = htmlAthletes;/*aqui voy a insertar mi plantilla que esta
   en generateAthleteTemplate*/
}

//aqui genero la lista de opciones para el filtro de paises y deportes.
let htmlCountrie = arrayCountries.map(generateOptionTemplate).join("");
insertHtmArray(team, htmlCountrie);
let htmlSport = arraySport.map(generateOptionTemplate).join("");
insertHtmArray(sport, htmlSport);

//declaro estas dos funciones afuera porque necesito usarlas en los dos addEventListener
const filterByTeamFunc = (teamSelected) => {/*funcion que me retorna una funcion los atletas de un pais 
  que sean igual al valor del select */
  return (athlete) => athlete.team == teamSelected;
}

const filterBySportFunc = (sportSelected) => {/*funcion que me retorna una funcion de atletas por deportes 
  que sean igual al valor del select */
  return (athlete) => athlete.sport == sportSelected;
}

const filterByGender = (genderSelected) => {
  return (athlete) => athlete.gender == genderSelected;
}

let filtersToSort = [];/*esta varieble la utilizo para guardar todos los filtros realizados y 
utilizarlos para ordenar.*/

//funcion que trabaja con todos los filtros.
const functionFilterGrouping = () => {


  const sportSelected = sport.value;//*guardo el valor(la accion del usuario)
  const teamSelected = team.value;//*guardo el valor(la accion del usuario)
  const genderSelected = gender.value;
  let filteredAthletes = arrayAthletes;// arreglo local con el que voy a filtrar sin dañar mi arreglo original.

  /* uso condicionales para comparar: si el valor de mis dos select es igual igual a "todos" se mostrara 
   la data completa sin filtrar  y con un map nos debuelve el arreglo modificado con la platilla de los atletas */
  if (teamSelected !== "todos" ) {

    filteredAthletes = functionAll(filteredAthletes, filterByTeamFunc(teamSelected));

  }
  if (sportSelected !== "todos" ) {

    filteredAthletes = functionAll(filteredAthletes, filterBySportFunc(sportSelected));
    
  }
  if (genderSelected != "todos") {

    filteredAthletes = functionAll(filteredAthletes, filterByGender(genderSelected));
  }

    filtersToSort = filteredAthletes;
    insertHtmlAtheles(filteredAthletes.map(generateAthleteTemplate).join(''));
  

  document.getElementById('containerFatherMain').style.display = 'none';//ocultamos
  document.getElementById('carousel').style.display = 'none';//ocultamos
  document.getElementById('displayOrder').style.display = 'block';//mostramos
   
  //mensaje para indicar que no existe el atleta.
  if (filteredAthletes == 0) {
    document.getElementById('error').style.display ='flex';
  }else{
    document.getElementById('error').style.display ='none';
  }
  
};


team.addEventListener('change', functionFilterGrouping);
sport.addEventListener('change', functionFilterGrouping);
gender.addEventListener('change', functionFilterGrouping);


//orderBySelect es donde se encuentra el select de mis opciones para ordenar.
orderBySelect.addEventListener('change', (event) => {
  const sortByValue = event.target.value;/*guardo el eveto(la accion del usuario), su target y el valor que le puse*/
  if (sortByValue === "1") { //lo comparo
    //Aqui utilizo mi funcion sortData para ordenar mi arreglo original "arrayAthletes", le paso mi 
    //funcion de comparacion "sorByAge" y le indico la ordenacion que es ascendente con "true"

    let athleteSortByAge = sortData(filtersToSort, sortByAge, true);/*utilizo como argumento mi nuevo 
    arreglo que converti en string.*/
    insertHtmlAtheles(athleteSortByAge.map(generateAthleteTemplate).join(''));
  }

  if (sortByValue === "2") {
    let athleteSortByName = sortData(filtersToSort, sortByName, true);
    insertHtmlAtheles(athleteSortByName.map(generateAthleteTemplate).join(''));
  }

  if (sortByValue === "3") {
    let sortByNameReverse = sortData(filtersToSort, sortByName, false);
    insertHtmlAtheles(sortByNameReverse.map(generateAthleteTemplate).join(''));
  }
});

//Nai
//FUNCION PARA CREAR TABLA DE RANKING DE PAISES 
let tableMedals = computeDataTwo(datos.athletes); //Meto mi funcion en una variable 
//console.log(tableMedals);

let tableRankingTeam = document.getElementById("tableMedals"); //accedo a la tabla en el html 
let tableBody = document.createElement("tbody"); //accedo a crear el cuerpo de la tabla,contiene a un bloque de filas ( tr )

for (let i = 0; i <= 9; i++) { //Con un for recorro mi var que tiene el objeto hasta la posicion 9 
  const posititionTable = tableMedals[i]; //

  let row = document.createElement("tr");

  let td = document.createElement("td");
  td.innerHTML = posititionTable.team;
  row.appendChild(td);

  td = document.createElement("td");
  td.innerHTML = posititionTable.gold;
  row.appendChild(td);

  td = document.createElement("td");
  td.innerHTML = posititionTable.silver;
  row.appendChild(td);

  td = document.createElement("td");
  td.innerHTML = posititionTable.bronce;
  row.appendChild(td);

  td = document.createElement("td");
  td.innerHTML = posititionTable.total;
  row.appendChild(td);

  tableBody.appendChild(row);
}
tableRankingTeam.appendChild(tableBody);

//Esta es la tabla que aparece en el modal 

let modalTable = document.getElementById("tableMedalsModal");
let bodyTableMedal = document.createElement("tbody");

tableMedals.forEach(modal=>{
  let filaModal = document.createElement("tr");
  let tdModal = document.createElement("td");
  tdModal.innerHTML = modal.team;
  filaModal.appendChild(tdModal);

  tdModal = document.createElement("td");
  tdModal.innerHTML = modal.gold;
  filaModal.appendChild(tdModal);

  tdModal = document.createElement("td");
  tdModal.innerHTML = modal.silver;
  filaModal.appendChild(tdModal);

  tdModal = document.createElement("td");
  tdModal.innerHTML = modal.bronce;
  filaModal.appendChild(tdModal);

  tdModal = document.createElement("td");
  tdModal.innerHTML = modal.total;
  filaModal.appendChild(tdModal);

  bodyTableMedal.appendChild(filaModal);
});

modalTable.appendChild(bodyTableMedal);