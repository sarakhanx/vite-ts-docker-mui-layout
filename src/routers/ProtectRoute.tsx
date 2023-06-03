import { Navigate } from 'react-router-dom'

const token = localStorage.getItem('token')




// type ProtectRouteProps ={
//     redirectPath? : string,
//     children : ReactNode
// }

const ProtectRoute =({
    redirectPath = "/",
    children
}: any )=>{
    if(!token) {
       return <Navigate to={redirectPath}/>
    }else{
        return children
    }

}

export default ProtectRoute