import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import NavBar from './NavBar';
import Post from '../pages/Post';
import Posts from '../pages/Posts';
import Login from '../pages/Login';
import Logout from '../pages/Logout';


const App = () => {
    const [auth, setAuth] = useState({
        loggedIn: false,
        user: null
    })

    useEffect(() => {
        const storageAuth = localStorage.getItem('auth')
        
        if(!storageAuth) return
        
        window.axios.defaults.headers.common['Authorization'] = `Bearer ${storageAuth}`;

        window.axios.get('/api/check-auth')
        .then(resp => {
            console.log(resp)
            setAuth({ loggedIn: true, user: resp.data.user })
        })
    }, [])


    return (
        <BrowserRouter>
        <div className="container">
            <NavBar />
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/login" element={<Login />} />
                <Route path="/post/:id" element={<Post />} />
                        <Route path="/logout" element={<Logout />} />
                        {/* <Route path="/admin">
                        <Route index element={<Dashboard />} />
                            <Route path="new" element={<AddNewPost />} />
                            <Route path="edit/:id" element={<EditPost />} /></Route> */}
            </Routes>
        </div>
        </BrowserRouter>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
