import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const NewPost = () => {
    const [data, setData] = useState({
        user_id: auth.user.id
    })
    const navigate = useNavigate()

    const handleData = (e) => {
        setData({...data, [e.target.name] : e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        window.axios.post('/api/posts/', data)
        .then(resp => {
            navigate('/admin')
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <article className="article">
            <h1>New Article</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Post Title:</label>
                    <input
                        type="text"
                        name="title"
                        onChange={handleData}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label>Post Content:</label>
                    <textarea
                        name="content"
                        onChange={handleData}
                        className="form-control"
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label>Featured Image:</label>
                    <input
                        type="text"
                        name="image"
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

export default NewPost
