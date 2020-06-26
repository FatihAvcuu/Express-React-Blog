import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserConsumer from '../context'
import { useLocation, Redirect } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const QueryPage = () => {
    let query = useQuery();

    const [Blog, setBlog] = useState({ title: '', banner: '', description: '', content: '', id: '' });
    //start on page loaded
    useEffect(() => {
        axios.get(`/api/blog?id=${query.get('id')}`)
            .then(obj => {
                setBlog(obj.data)
            })
    }, []);

    return (
        <UserConsumer>
            {
                value => {
                    const { user } = value;
                    if (typeof (Blog) === "string") {
                        return <Redirect to='/' />
                    }
                    return (
                        <div className='container mb-5'>
                            <div className="entry">
                                <h2>&lt;/&gt;</h2>
                                <h6>Wellcome to developer blog</h6>
                                <hr />
                            </div>
                            <div className="article col-md-9">
                                <img style={{ width: '100%' }} className='img-fluid rounded' src={Blog.banner} alt="Image" />
                                <h1>{Blog.title}</h1>
                                <hr />
                                <ReactMarkdown source={Blog.content} />
                            </div>
                        </div>
                    )
                }
            }
        </UserConsumer>
    )
}

export default QueryPage