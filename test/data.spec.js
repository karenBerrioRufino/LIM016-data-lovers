import { describe, it } from 'eslint/lib/rule-tester/rule-tester';
import{functionAll, allCountries, allSport, genderAll, filterByTeamFunc, filterBySportFunc, filterByGender, 
      sortData, sortByName, sortByAge, sortByTotalMedals, computeData} from '../src/data.js';
describe('probando la funcion functionAll teniendo como argumento filterByTeamFunc', () =>{
  const demoCountries = [
    {"team": "Italy"},
    {"team": "France"},
    {"team": "Iran"},
    {"team": "Italy"},
    {"team": "Italy"}
  ];
  it('debería retornar los atletas de Francia',() =>{
    let result = functionAll( demoCountries, filterByTeamFunc("France"));
    expect(result).toHaveLength(1);
  });
});

describe('probando la función functionAll teniendo como argumento filterBySportFunc', () => {
  const demoSport = [
    {"sport": "Rowing"},
    {"sport": "Rowing"},
    {"sport": "Taekwondo"},
    {"sport": "Handball"}
  ];
  it('debería retornar los atletas del deporte', () =>{
    let result = functionAll(demoSport, filterBySportFunc("Taekwondo"));
    expect(result).toHaveLength(1);
  });
});

describe ('probando la función functionAll teniendo como argumento filterByGender', () =>{
  const demoFunction = [
      {"gender": "M"},
      {"gender": "F"},
      {"gender": "M"}
  ];
  it('debería retornar la cantidad de atletas femeninas', ()=>{
    let result = functionAll(demoFunction, filterByGender("F"));
    expect(result).toHaveLength(1);
  });
});

describe ('probando la función allCountries', () => {
  const demoCountries = [
    {"team": "Italy"},
    {"team": "France"},
    {"team": "Iran"},
    {"team": "Italy"},
    {"team": "Italy"}
  ];
  it('debería retornar los paises sin repetición', () => {
    let result = Array.from(allCountries(demoCountries));
    expect(result.length).toEqual(3);
  });
});

describe('probando la función allSport', () => {
  const demoSport = [
    {"sport": "Rowing"},
    {"sport": "Rowing"},
    {"sport": "Taekwondo"},
    {"sport": "Handball"}
  ];
  it('debería retornar los deportes sin repetición', () =>{
    let result = Array.from(allSport(demoSport));
    expect(result.length).toEqual(3);
  });
});

describe ('probando la funcion genderAll', () =>{
  const demoGender = [
  {"gender": "M"},
  {"gender": "F"},
  {"gender": "M"}
];
  it('deberia retornar "M" y "F" sin repeticiones', () =>{
    let result = Array.from(genderAll(demoGender));
    expect(result.length).toEqual(2); //dos es la cantidad de resultados
  });
});

describe('probando la función sortData teniendo como argumento sortByName', () => {
  const demoName = [
    {"name": "Giovanni Abagnale"},
    {"name": "Patimat Abakarova"},
    {"name": "Luc Abalo"}
  ];
  it ('debería ordenar los atletas filtrados de forma ascendente', () => {
    let arrExpected = [
      {"name": "Giovanni Abagnale"},
      {"name": "Luc Abalo"},
      {"name": "Patimat Abakarova"}
    ];
    let result = sortData(demoName, sortByName, true);
    expect(result).toStrictEqual(arrExpected);
  });
  it('debería ordenar los atletas filtrados de forma descendente', () => {
    let arrExpected = [
      {"name": "Patimat Abakarova"},
      {"name": "Luc Abalo"},
      {"name": "Giovanni Abagnale"}     
    ];
    let result = sortData(demoName, sortByName, false);
    expect(result).toStrictEqual(arrExpected);
  });
  it('debería retornar 0 si los dos nombre son iguales', () =>{
    let result = sortByName(
      {"name": "Patimat Abakarova"},
      {"name": "Patimat Abakarova"} 
    );
    expect(result).toStrictEqual(0);
  });
});

describe('probando la función sortData teniendo como argumento sortByAge', () => {
  const demoAge = [
      {"age": 21},
      {"age": 31},
      {"age": 26}
  ];
  it('debería ordenar la edad de los atletas filtrados de forma ascendente', () => {
    let arrExpected = [
      {"age": 21}, 
      {"age": 26},
      {"age": 31}
    ];
    let result = sortData(demoAge, sortByAge, true);
    expect(result).toStrictEqual(arrExpected);
  });
  it('debería retornar 0 si las edades son iguales', () =>{
    let result = sortByAge(
      {"age": 21}, 
      {"age": 21}
    );
      expect(result).toStrictEqual(0);
  });
});

describe('probando la funcion sortByTotalMedals', ()=>{
  it('debería retornar el total de medallas por país de forma ascendente', ()=>{
    let result = sortByTotalMedals({total: 300}, {total: 1000});
    expect(result).toStrictEqual(1);
  });
  it('debería retornar el total de medallas por país de forma descendente', () =>{
    let result = sortByTotalMedals({total: 1000}, {total: 300});
    expect(result).toStrictEqual(-1);
  });
  it('debería retornar 0 si los resultados son iguales', () => {
    let result = sortByTotalMedals({total: 300}, {total: 300});
    expect(result).toStrictEqual(0);
  });
});
describe('probando la función computeData', () =>{
  const demoMedal =[
    {"team": "Italy",
     "medal": "Bronze"},
    {"team": "Italy",
     "medal": "Bronze"},
    {"team": "Italy",
    "medal": "Silver"},
    {"team": "Italy",
     "medal": "Gold"}
  ];
  it('debería indicar cuantas medallas ganó Italia y el total', () =>{
    let result = computeData(demoMedal);
    expect(result[0].bronce).toStrictEqual(2);
    expect(result[0].silver).toStrictEqual(1);
    expect(result[0].gold).toStrictEqual(1);
    expect(result[0].total).toStrictEqual(4);
  });
});