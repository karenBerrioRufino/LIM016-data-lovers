

import { functionAll,filterByTeamFunc } from '../src/data.js';

/*
describe('probando la funcion sortData', () => {
  it('is a function', () => {
    expect(typeof sortData).toBe('function');
  });

  
});
*/
describe('probando la funcion functionAll', () => {
  it('debe ser una funcion', () => {
    expect(typeof functionAll).toBe('function');
  }); 
});

it ('deberia retornar cuantos atletas por el pais "France', ()=>{
  let arrayTest = [  {
    "name": "Tijana Bogdanovi",
    "gender": "F",
    "height": "172",
    "weight": "52",
    "sport": "Taekwondo",
    "team": "Serbia",
    "noc": "SRB",
    "age": 18,
    "event": "Taekwondo Women's Flyweight",
    "medal": "Silver"
  },
  {
    "name": "Andreea Boghian",
    "gender": "F",
    "height": "186",
    "weight": "78",
    "sport": "Rowing",
    "team": "Romania",
    "noc": "ROU",
    "age": 24,
    "event": "Rowing Women's Coxed Eights",
    "medal": "Bronze"
  },
  {
    "name": "Thibault Colard",
    "gender": "M",
    "height": "187",
    "weight": "70",
    "sport": "Rowing",
    "team": "France",
    "noc": "FRA",
    "age": 24,
    "event": "Rowing Men's Lightweight Coxless Fours",
    "medal": "Bronze"
  }];
  let testFunctionAll = functionAll(arrayTest, filterByTeamFunc('France'));
  expect (testFunctionAll.length).toBe(1);
})

