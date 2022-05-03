import axios from 'axios'

export default class CarService{

    getCars(){
        
        return axios.get('data/cars.json').then(res => res.data.data);
  
        // return axios.get('cars').then(res => res.data.data);
    }
}