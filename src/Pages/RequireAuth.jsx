import { auth } from "../firebase"
import {Navigate} from 'react'


function RequireAuth({children}) {

	if(!auth.user){
		return <Navigate to="/login" />
	}else{
		
		return children
	}


}

export default RequireAuth