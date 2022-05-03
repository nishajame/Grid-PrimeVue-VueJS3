import axios from 'axios'

export default class CustomerService{

    getCustomersLarge() {
        return axios.get('data/customers-large.json').then(res => res.data.data);
    }

    getCustomersMedium() {
        return axios.get('data/customers-medium.json').then(res => res.data.data);
    }
}