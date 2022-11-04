import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const [data, setData] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        window.axios.get('/api/posts/')
        .then(resp => setData(resp.data))
        .catch(err => {
            console.log(err)
        })
    }, [refresh])

    const handleDelete = (id) => {
        if( !confirm('Do your really want to delete it?') ) return
        window.axios.delete('/api/posts/' + id)
        .then(resp => {
            setRefresh(prev => !prev)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <article className="article">
            <div className="d-flex align-items-center justify-content-between">
                <h1>Articles list</h1>
                <Link to="/admin/new" className="btn btn-primary">Create</Link>
            </div>
            {data.length > 0 ?
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Date Created</th>
                            <th>Date Modified</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(post =>
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.user?.name}</td>
                                <td>{new Date(post.created_at).toLocaleDateString('en-US') + ' ' + new Date(post.created_at).toLocaleTimeString('en-US')}</td>
                                <td>{new Date(post.updated_at).toLocaleDateString('en-US') + ' ' + new Date(post.updated_at).toLocaleTimeString('en-US')}</td>
                                <td>
                                    <div className="d-flex">
                                    <Link to={'/admin/edit/' + post.id} className="btn btn-warning btn-sm me-3">Edit</Link>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(post.id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            :
                <h5 className="mt-3">No record found</h5>
            }
        </article>
    )
}

export default Dashboard
