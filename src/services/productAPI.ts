import http from './confAxios'


const getAllProducts =()=>{
    return http.get('/products?populate=*')

}
export default {getAllProducts};