

/*exporto mi funcion para usarla en otro partes de la aplicacion*/
// Este funcion recibe 3 parametros, el primero es un Array de Athletas
// El segundo parametro es una funcion de comparacion que va a utilizar el metodo sort, de Array para ordernar.
// el tercer parametro se usara para ordenar de manera ascendente o descendente, este parametro es de tipo booleano: 
// Si es true entonces el ordenamiento sera ascendente, si es false entonces sera descendente


const sortData = (data, sortBy, sortOrder) => {

  if (sortOrder) {
    return data.sort(sortBy);/*con el metodo sort hago una ordenacion alfabetica. Con sortBy (funcion 
            de comparacion) ordenara bajo un criterio*/
  } else {
    return data.sort(sortBy).reverse();
  }

}

// FUNCION QUE FILTRA LAS MEDALLAS QUE GANARON LOS EQUIPOS
 
  const computeData = (datos) => {//Le paso como parametro datos que tiene la bd con todos los atletas
  const countriesWonMedals = datos
  .map(country => {  // con map devuelvo un nuevo array, con los resultados de cada elemento. 
   return country.noc + " " + country.medal});
   //console.log(countriesWonMedals);


   const teamWithMedals = []; //Equipos que ganaron medallas, esta vacio porque aqui entrara el valor del push
  for (let j = 0; j < countriesWonMedals.length; j++) { //Recorro el nuevo array que  muestra el pais y la medalla que ganaron
    const totalTeamWithMedals = countriesWonMedals[j] + " " + countriesWonMedals.filter(noc => noc === countriesWonMedals[j]).length //OJO//luego de recorrer el for obtengo el total de cada tipo de medallas de cada equipo 
    teamWithMedals.push(totalTeamWithMedals) //con push vamos agregando los elementos que va sumando y los agrega al array y cambia su longitud
    //console.log(teamWithMedals);
    //console.log(totalTeamWithMedals);

  }
  const eliminatingDuplicateTeams = new Set(teamWithMedals); //new set elimina los elementos que se repiten dentro del objeto y devuelve uno nuevo
  let newArrayTeamWithMedals = Array.from(eliminatingDuplicateTeams); //convierto el objeto en un array
  //console.log(eliminatingDuplicateTeams);
  //console.log(newArrayTeamWithMedals);

//Creamos un NUEVO OBJETO A PARTIR DEL VALOR DE MI ARRAY, para poder manipular cada uno de sus elementos 
  let creatingNewObject = newArrayTeamWithMedals.map(country => ( {      // Aplicamos un transformación con map a nuestro array, el map trae incorporado un ForEach que recorre nuestro array y devuelve la transformación 
    noc: country.split(" ")[0],    // team: es el nombre que le doy a la propiedad --- country.split(" ")[0]; es el valor que tendra mi parametro country en la posicion 0;
    medal: country.split(" ")[1],    // medal: es el nombre que le doy a la propiedad --- country.split(" ")[1]; es el valor que tendra mi parametro country en la posicion 1;
    total: Number(country.split(" ")[2])  // total: es el nombre que le doy a la propiedad --- Number.split(" ")[2]; es el valor que tendra mi parametro country en la posicion 2; //Number es para convertir el string en numero
  })); 
  
    //console.log(creatingNewObject);
/* let totalya = 0;
  for (let k=0; k<creatingNewObject.length; k++){
  if(creatingNewObject[k].noc === "USA"){
    totalya += creatingNewObject[k].total;
  }
  }
  console.log(totalya); 
 */



  /*FUNCION PARA ORDENAR DESCEDENTE LA CANTIDAD DE MEDALLAS POR EQUIPOS 
 si (prev) debe ir ordenado antes que (next) entonces retorna un numero menor que 0, es decir (1)
  si (prev) debe ir ordenado despues que (next) entonces retorna un numero mayor que 0, es decir (-1)
  si son iguales retorna 0 
*/
    /* creatingNewObject.sort(function(prev, next){
    if(prev.total < next.total){
      return 1;
    }
    if (prev.total > next.total){
      return -1;
    } return 0;
  }); */
   
    //console.log(creatingNewObject);

}

const computeDataTwo = (datos) =>{
  const mapCountry = new Map(); 
  //Aqui inicializamos nuetro mapa de paises con todas las medallas en cero 
 for (let index = 0; index < datos.length; index++) {
   const element = datos[index];
   if (!mapCountry.has(element.team)) { 
     const initValue = {silver: 0, gold: 0,bronze: 0, total: 0}
     mapCountry.set(element.team, initValue); //creando por primera vez el set dentro del Map 
   }
 }
 
 //Aqui vamos a contar todas las medallas 
 for (let index = 0; index < datos.length; index++) {
  const element = datos[index];
  const country = mapCountry.get(element.team); 
  if (element.medal === "Gold") {
   country.gold = country.gold +1;
  }
  if (element.medal === "Bronze") {
    country.bronze = country.bronze +1;
   }
   if (element.medal === "Silver") {
    country.silver = country.silver +1;
   }
   country.total = country.total +1;
   mapCountry.set(element.team, country) ///Aqui reemplazamos con el nuevo objeto 
}

//transformando el Map en un array de noc y total 
 const array = [];
mapCountry.forEach((value,key)=>{
  const totalMedalByNoc = {team: key, gold:value.gold, silver:value.silver, bronce:value.bronze, total: value.total};
  array.push(totalMedalByNoc);
  console.log(totalMedalByNoc);
}) 
//Ordenando de mayor a menor el total de medallas por pais
 return array.sort(function(prev, next){
  if(prev.total < next.total){
    return 1;
  }
  if (prev.total > next.total){
    return -1;
  } return 0;
});
}


    

/* const computeData = (datos, medal) => { //Le paso dos parametros datos y medallas. El primero (datos) tiene la bd con todos los atletas, el segundo (medal) es lo que voy a necesitar de la base de datos
  const arrayOfNoc = [];
  const countriesWonMedals = datos.filter(athletes => athletes.medal === medal) // Llamo el objeto atletas e indico que la propiedad de medallas sera igual a las mmedallas ganadas    */
 /*  for (let i = 0; i < countriesWonMedals.length; i++) { //Hago un for para recorrer el objeto y voy contando de 1 en 1 la medallas por equipos
    arrayOfNoc.push(countriesWonMedals[i].noc) //va recorriendo el objeto y va insertando en el array los equipos que ganaron medallas 
  }
  const teamWithMedals = []; //Equipos que ganaron medallas
  for (let j = 0; j < arrayOfNoc.length; j++) { //Recorro el nuevo array que tiene el filtro donde se muestra el pais y la cantidad de medallas
    const totalTeamWithMedals = arrayOfNoc[j] + " "+ medal + " " + arrayOfNoc.filter(team => team === arrayOfNoc[j]).length // Le indico que solo me muestre los equipos y la cantidad de medallas que ganaron 
    teamWithMedals.push(totalTeamWithMedals) //creamos un nuevo objeto con los equipos y la cantidad de medallas que ganaron  
  }
 const eliminatingDuplicateTeams = new Set(teamWithMedals); //new set elimina los elementos que se repiten dentro del objeto y devuelve uno nuevo
 let newArrayTeamWithMedals = Array.from(eliminatingDuplicateTeams); //convierto el objeto en un array
 */
  /*CREAMOS UN NUEVO OBJETO 
 Hago una función que transforme mi array (p), country es mi parametro. 
 team y medal es la nueva propiedad que estoy creando para este objeto
 .split(" ") divide la cadena en partes y devuelve un array con los trozos
  EL ( que esta despues de la flecha => es para indicar el return, esto quiere decir que esta implicito en la función*/
 
   /*  let creatingNewObject = newArrayTeamWithMedals.map(country => ( {      // Aplicamos un transformación con map a nuestro array, el map trae incorporado un ForEach que recorre nuestro array y devuelve la transformación 
    team: country.split(" ")[0],    // team: es el nombre que le doy a la propiedad --- country.split(" ")[0]; es el valor que tendra mi parametro country en la posicion 0;
    medal: country.split(" ")[1],    // medal: es el nombre que le doy a la propiedad --- country.split(" ")[1]; es el valor que tendra mi parametro country en la posicion 1;
    total: Number(country.split(" ")[2])  // total: es el nombre que le doy a la propiedad --- Number.split(" ")[2]; es el valor que tendra mi parametro country en la posicion 2; //Number es para convertir el string en numero
  })) 

  console.log(creatingNewObject) 
 */


  /*FUNCION PARA ORDENAR DESCEDENTE LA CANTIDAD DE MEDALLAS POR EQUIPOS 
 si (prev) debe ir ordenado antes que (next) entonces retorna un numero menor que 0, es decir (1)
  si (prev) debe ir ordenado despues que (next) entonces retorna un numero mayor que 0, es decir (-1)
  si son iguales retorna 0 
*/
   /* creatingNewObject.sort(function(prev, next){
    if(prev.total < next.total){
      return 1;
    }
    if (prev.total > next.total){
      return -1;
    } return 0;
  });*/
   


  
export {
  sortData,
  computeDataTwo,
  computeData
} 