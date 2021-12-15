const functionAll = (array, condicion) => {
  return array.filter(condicion);
};

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

const genderAll = (array) => {
  const newArrGender = array.map(gen2 => {
    return gen2.gender;
  });
  return new Set(newArrGender);
}

const filterByTeamFunc = (teamSelected) => {
  return (athlete) => athlete.team == teamSelected;
}

const filterBySportFunc = (sportSelected) => {
  return (athlete) => athlete.sport == sportSelected;
}

const filterByGender = (genderSelected) => {
  return (athlete) => athlete.gender == genderSelected;
}

const sortData = (data, sortBy, sortOrder) => {
  if (sortOrder) {
    return data.sort(sortBy);
  } else {
    return data.sort(sortBy).reverse();
  }
}

const sortByName = (athlete1, athlete2) => {
  if (athlete1.name > athlete2.name) {
    return 1;
  }
  if (athlete1.name < athlete2.name) {
    return -1;
  }
  return 0;
};

const sortByAge = (athlete1, athlete2) => {
  if (athlete1.age > athlete2.age) {
    return 1;
  }
  if (athlete1.age < athlete2.age) {
    return -1;
  }
  return 0;
};

const sortByTotalMedals = (prev, next) => {
  if (prev.total < next.total) {
    return 1;
  }
  if (prev.total > next.total) {
    return -1;
  } return 0;
}
const computeData = (datos, propiedad) => {
  const newArrayObj = new Map(); 
  for (let i = 0; i < datos.length; i++) {
    const element = datos[i];
    if (!newArrayObj.has(propiedad == "name" ? element.name : element.team)) {
      const initValue = { silver: 0, gold: 0, bronze: 0, total: 0 }
      newArrayObj.set(propiedad == "name" ? element.name + " " + element.team: element.team, initValue);
    }
  } 
 for (let i = 0; i < datos.length; i++) {
   const element = datos[i];
    const country = newArrayObj.get(propiedad == "name" ? element.name + " " + element.team: element.team);
    if (element.medal === "Gold") {
      country.gold += 1;
    }
    if (element.medal === "Bronze") {
      country.bronze += 1;
    }
    if (element.medal === "Silver") {
      country.silver += 1;
    }
    country.total += 1;
    newArrayObj.set(propiedad == "name" ? element.name + " " + element.team : element.team , country)
  }
  const array = [];
  newArrayObj.forEach((value, key) => {
    const totalMedalByNoc = {
      team: key,
      name: key,
      gold: value.gold,
      silver: value.silver,
      bronce: value.bronze,
      total: value.total
    };
    array.push(totalMedalByNoc);
  })
  return array.sort(sortByTotalMedals);
}; 

export {
  functionAll,
  allCountries,
  allSport,
  sortData,
  sortByName,
  sortByAge,
  computeData,
  sortByTotalMedals,
  genderAll,
  filterByTeamFunc,
  filterBySportFunc,
  filterByGender
}
