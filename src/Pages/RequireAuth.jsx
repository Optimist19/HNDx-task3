import {Navigate} from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../Context/AuthContext'


export function RequireAuth({children}) {

	const {auth} = useContext(Context)

	if(!auth){
		return <Navigate to="/login" replace/>
	}else{
		return children
	}
}
