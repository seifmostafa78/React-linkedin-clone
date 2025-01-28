import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const RequireAuth = ({children}) => {
  const user = useSelector((state) => state.userState.user)
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!user){
        navigate("/", {replace: true})
        return;
    }
  }, [user])

  return children
}

export default RequireAuth
