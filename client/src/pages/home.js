import React, { Component } from 'react'
import axios from 'axios'
import './home.css'

export default class home extends Component {
    state = {
        blogs: []
    }
    componentDidMount() {
        axios.get('/api/getblog')
            .then(obj => this.setState({ blogs: obj.data }))
    }
    render() {
        return (
            <div className='container mb-5'>
                <div className="entry">
                    <h1>&lt;/&gt;</h1>
                    <h5>Wellcome to developer blog</h5>
                    <hr />
                </div>
                    <div className='content'>
                        {this.state.blogs.map(blog => {
                            return (
                                <div className="blog col-md-9">
                                    <img className="img-fluid blog-img" src={blog.banner} alt="Blog Image" />
                                    <h2>{blog.title}</h2>
                                    <p>{blog.description}</p>
                                </div>
                            )
                        })
                        }
                    </div>
            </div>
        )
    }
}
