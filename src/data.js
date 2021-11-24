
//funcion para filtrar
const functionAll = (array, condicion) => {
  return array.filter(condicion);
};


/* funcion para obtener un arreglo de solo paises, deportes y genero*/
const allCountries = (countries) => {
  const newArrCountries = countries.map(newTeam => {
    return newTeam.team
  });
  return new Set(newArrCountries);
}

const allSport = (sport) => {
  const newArrSport = sport.map(newTeam => {
    return newTeam.sport
  });
  return new Set(newArrSport);
}

const allTeams = (athletes) => {
  const allTeamsWithDuplicates = athletes.map(person => {
    return person.team
  });
  return new Set(allTeamsWithDuplicates);
}

const genderAll = (array) => {
  const newArrGender = array.map(gen2 => {
    return gen2.gender;  
  });
    return new Set(newArrGender);
}
/*
 Este funcion recive 3 parametros, el primero es un Array de Athletas
 El segundo parametro es una funcion de comparacion que va a utilizar el metodo sort, de Array para ordernar.
 el tercer parametro se usara para ordenar de manera ascendente o descendente, este parametro es de tipo booleano: 
 Si es true entonces el ordenamiento sera ascendente, si es false entonces sera descendente
*/
const sortData = (data, sortBy, sortOrder) => {
  if (sortOrder) {//true
    return data.sort(sortBy);/*con el metodo sort hago una ordenacion alfabetica. Con sortBy (funcion 
            de comparacion) ordenara bajo un mi criterio*/
  } else {//false
    return data.sort(sortBy).reverse();
  }

}
/*mis funciones de comparacion para utilizarlas en mi funcion sort y poder ordenar de una forma
mas natural (1,2,3,4 o a,b,c,d) ya que con sort los elementos si se ordenan pero de una forma predeterminada
del navegador y no es una ordenacion que deseo*/

const sortByName = (athlete1, athlete2) => {//ordeno atletas
  if (athlete1.name > athlete2.name) {
    /*si el primer elemento es mayor se colocara en una posicion
     despues del segundo*/
    return 1;
  }
  if (athlete1.name < athlete2.name) {
    return -1;
    /*si el lemento es menos que el segundo se resta y se coloca 
    en una posicion menor al segundo.*/
  }
  return 0;
  /* si los dos elementos son iguales se quedaran en la misma posicion*/
};

const sortByAge = (athlete1, athlete2) => {//ordeno por edad
  if (athlete1.age > athlete2.age) {
    return 1;
  }
  if (athlete1.age < athlete2.age) {
    return -1;
  }
  return 0;
};

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



export {
  functionAll,
  allCountries,
  allSport,
  allTeams,
  sortData,
  sortByName,
  sortByAge,
  computeDataTwo,
  genderAll
}