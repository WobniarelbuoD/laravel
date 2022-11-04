import { useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [data, setData] = useState({})
    const navigate = useNavigate()

    const handleData = (e) => {
        setData({...data, [e.target.name] : e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        window.axios.post('/api/login/', data)
        .then(resp => {
            if(resp.data.token) {
                localStorage.setItem('auth', resp.data.token)
                window.axios.defaults.headers.common['Authorization'] = `Bearer ${resp.data.token}`;
                navigate('/')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <article className="article login">
            <h1>Please Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Email address:</label>
                    <input 
                        type="email" 
                        name="email" 
                        onChange={handleData} 
                        className="form-control" 
                    /> 
                </div>
                <div className="mb-3">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        onChange={handleData} 
                        className="form-control" 
                    /> 
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </article>
    )
}

export default Login