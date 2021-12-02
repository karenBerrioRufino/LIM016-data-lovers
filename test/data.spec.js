// importamos las funciones `computeData` y `computeDataTwo` del archivo data.js
import { computeData, computeDataTwo } from '../src/data.js';

const mockData = [
  {
    "name": "Meaghan Benfeito",
    "sport": "Diving",
    "team": "Canada",
    "noc": "CAN",
    "medal": "Bronze"
  },
  {
    "name": "Brittany \"Britt\" Benn",
    "sport": "Rugby Sevens",
    "team": "Canada",
    "noc": "CAN",
    "medal": "Bronze"
  },
  {
    "name": "Karen Bennett",
    "sport": "Rowing",
    "team": "Great Britain",
    "noc": "GBR",
    "medal": "Silver"
  },
  {
    "name": "Mark Stewart Bennett",
    "sport": "Rugby Sevens",
    "team": "Great Britain",
    "noc": "GBR",
    "medal": "Silver"
  }
]

describe('probando la funcion computeData', () => {
  it('is a function', () => {
    expect(typeof computeData).toBe('function');
  });
  it ('Deberia retornar 2 para Bronze', () =>{
    const mockResult = computeData('Bronze', mockData)
    expect(mockResult.CAN).toEqual(2);
  });
  it('No deberia ser Null', () => {
    expect(computeData).not.toBeNull();
  });
});
describe('probando la funcion computeDataTwo', () => {
  it('is a function', () => {
    expect(typeof computeDataTwo).toBe('function');
  }); 
});


