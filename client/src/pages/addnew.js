import React, { useState } from 'react'
import axios from 'axios'
import './panel.css'
import UserConsumer from '../context'
import qs from 'qs'
import { Redirect } from 'react-router-dom'

const AddNew = () => {
    const [Blog, setBlog] = useState({ title: '', banner: '', description: '', content: '',id:'' });
    const [Cancel, setCancel] = useState(false);

    let InputChancer = e => {
        let newBlog = Blog;
        newBlog[e.target.name] = e.target.value;
        setBlog({ title: newBlog.title, banner: newBlog.banner, description: newBlog.description, content: newBlog.content, id: newBlog.id });
    }

    let UpdateFile = user => {
        if(window.confirm('Are you sure you will add?')){
            axios({
                method: 'post',
                url: '/api/addblog',
                data: qs.stringify({
                    uid: user.id,
                    name: user.name,
                    md:Blog.content,
                    description:Blog.description,
                    title:Blog.title,
                    banner:Blog.banner
                }),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            })
            .then(obj => setCancel(true))
            .catch(err => alert('Something Wrong!'))
        }
    }

    return (
        <UserConsumer>
            {
                value => {
                    const { user } = value;
                    if (typeof (Blog) === "string") {
                        return <Redirect to='/' />
                    }
                    if(Cancel){
                        return <Redirect to='/panel' />
                    }
                    return (
                        <div className='container mt-2'>
                            <h1>&lt;/&gt; Admin Panel</h1>
                            <hr />
                            <div>
                                <h5 style={{ wordWrap: 'break-word' }}>New blog creating</h5>
                                <br />
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" className="form-control" onChange={InputChancer} value={Blog.title} name='title' />
                                </div>
                                <div className="form-group">
                                    <label>Banner Url</label>
                                    <br />
                                    <img className='mb-2 img-fluid rounded' src={Blog.banner} alt='Banner preview' />
                                    <input type="text" className="form-control" onChange={InputChancer} value={Blog.banner} name='banner' />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea style={{ height: '100px' }} type="text" className="form-control" onChange={InputChancer} value={Blog.description} name='description' />
                                </div>
                                <div className="form-group">
                                    <label>Content</label>
                                    <textarea style={{ height: '250px' }} type="text" className="form-control" onChange={InputChancer} value={Blog.content} name='content' />
                                </div>
                                <div className="form-group">
                                    <button onClick={UpdateFile.bind(this,user)} className='btn btn-success float-right mb-3'>Add</button>
                                    <button onClick={e => {
                                        if(window.confirm('Are you sure you will cancel?')){setCancel(true)}
                                    }} className='btn btn-secondary float-right mb-3 mr-2'>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        </UserConsumer>
    )
}

export default AddNew