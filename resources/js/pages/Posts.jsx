import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'

const Posts = () =>{

    const [data, setData] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [auth, setAuth] = useState({})
// console.log(data);
    const handleSubmit = (e) =>{
        e.preventDefault()
        const formData = new FormData(e.target)
        window.axios.post('api/posts',formData)
        .then(resp =>{
            setRefresh(!refresh)
            console.log(resp)
        })
        .catch(err => console.log(err))
    }

    const handleLogin = (e) =>{
        e.preventDefault()
        const formData = new FormData(e.target)
        window.axios.post('api/login',formData)
        .then(resp =>{
            setAuth({
                loggedIn: true,
                user: resp.data.user
            })
            localStorage.setItem('token', resp.data.token)
            window.axios.defaults.headers.common['authorization'] = `Bearer ${resp.data.token}`;
        })
        .catch(err => console.log(err))
    }

    useEffect(() =>{
        const token = localStorage.getItem('token')
        if(!token) return

        window.axios.defaults.headers.common['authorization'] = `Bearer ${token}`;

        window.axios.get('api/check-auth/')
        .then(resp => setAuth({loggedIn: true}))
        .catch(err => console.log(err))
    },[])

    useEffect(() =>{
        window.axios.get('/api/posts')
        .then(resp=> {
            console.log(resp)
            setData(resp.data)
        })
        .catch(err => console.log(err))

    }, [refresh])

    useEffect(() =>{
        window.axios.get('/api/posts')
        .then(resp=> {
            console.log(resp)
            setData(resp.data)
        })
        .catch(err => console.log(err))

    }, [refresh])
    

return(
<>
<h1>Posts</h1>
<div className='d-flex flex-wrap'>
    {data.map(post =>
    <div key={post.id} className='col-3 p-3'>
        <div>
            <div className="date">{new Date(post.created_at).toLocaleDateString('en-US')}</div>
                <img style={{width:"100%",height:"16vh"}} src={post.image} alt={post.title} />
        </div>
        <div className="blog-info">
            <p>{post.content.split(' ').splice(0, 20).join(' ') + '...'}</p>
            <div className="btn-bar">
                        <Link to={'/post/' + post.id} className="px-btn-arrow">
                            <span>Read More</span>
                            <i className="arrow"></i>
                        </Link>
                    </div>
        </div>
    </div>
    )}
 </div>
 
 {!auth.loggedIn ?
            <form onSubmit={handleLogin}>
    <div className='mb-3'>
        <label>Email:</label>
        <input type="text" name='email' className="form-control" />
    </div>
    <div className='mb-3'>
        <label>slaptas zodis:</label>
        <input type="password" name='password' className="form-control"/>
    </div>
    <div>
        <button className='btn btn-primary'>Login</button>
    </div>
        
</form>

:

<form onSubmit={handleSubmit}>
    <div className='mb-3'>
        <label>Title:</label>
        <input type="text" name='title' className="form-control" />
    </div>
    <div className='mb-3'>
        <label>Content:</label>
        <input type="text" name='content' className="form-control"/>
    </div>
    <div className='mb-3'>
        <label>Photo:</label>
        <input type="text" name='image' className="form-control"/>
    </div>
    <div>
        <button className='btn btn-primary'>Upload</button>
    </div>
        
</form>
}
 </>
)}

export default Posts;