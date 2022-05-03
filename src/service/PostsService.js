import axios from 'axios'

export default class PostsService{

    getPosts(){
        return axios.get('https://jsonplaceholder.typicode.com/posts').then(res => res.data);
        
    }
}