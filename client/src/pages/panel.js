import React, { Component } from 'react'
import axios from 'axios'
import './panel.css'
import UserConsumer from '../context'
import qs from 'qs'
import {Link} from 'react-router-dom'

export default class panel extends Component {
    state = {
        blogs: []
    }
    componentDidMount() {
        axios.get('/api/getblog')
            .then(obj => this.setState({ blogs: obj.data }))
    }
    update() {
        axios.get('/api/getblog')
            .then(obj => this.setState({ blogs: obj.data }))
    }
    delete (id, user) {
        if(window.confirm('Are you sure?')){
        axios({
            method: 'delete',
            url: '/api/blog',
            data: qs.stringify({
                id: id,
                uid: user.id,
                name: user.name
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
        .then(obj => this.update())
        .catch(err => alert('Something Wrong!'))
    }
    }
    render() {
        return (
            <UserConsumer>
                {
                    value => {
                        const { user } = value;
                        return (
                            <div className='container mt-2'>
                                <h1>&lt;/&gt; Admin Panel</h1>
                                <hr />
                                <div className="row justify-content-center content">
                                    <Link to='/addblog' className='col-10 line'><button className='col-10 line'>
                                        <div className="row line align-items-center ml-1">
                                            <i className="fas fa-edit"></i>
                                            <h5>Add New Article</h5>
                                        </div>
                                    </button></Link>
                                    {this.state.blogs.map(blog => {
                                        return (
                                            <div key={blog.id} className="col-10 d-flex line">
                                                <div className='flex-grow-1 row align-items-center ml-1'>
                                                    <i className="fas fa-file-alt"></i>
                                                    <Link to={'/edit?id='+blog.id}><h5>{blog.title}</h5></Link>
                                                </div>
                                                <div>
                                                    <span onClick={this.delete.bind(this, blog.id, user)} className='span-icon'>x</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                        )
                    }
                }
            </UserConsumer>
        )
    }
}
