import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        window.axios.get('/api/logout')
        .then(resp => setAlert({ message: resp.data }))
        .finally(() => {
            navigate('/')
            localStorage.removeItem('auth')
        })
    }, [])

    return false
}

export default Logout