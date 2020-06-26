import React, { useState } from 'react'
import './LoginAdmin.css';
import UserConsumer from '../context'
import { Redirect } from "react-router-dom"

const LoginAdmin = () => {
    const [userState, setUser] = useState({ name: '', pw: '' });
    let InputChancer = e => {
        let newUser = userState;
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
    }
    let SubmitHandler = (dispatch,e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN", name: userState.name, password: userState.pw });
    }
    return (
        <UserConsumer>
            {
                value => {
                    const { dispatch, user } = value;
                    if(user) return <Redirect to='/panel'/>
                    return (
                        <div className='main'>
                            <form onSubmit={SubmitHandler.bind(this,dispatch)}>
                                <h2 className='title'>&lt;/&gt;<br /> Admin Panel</h2>
                                <center>
                                    <input name='name' type="text" onChange={InputChancer} placeholder='Enter UserName...' />
                                    <input name='pw' type="password" onChange={InputChancer} placeholder='Enter Password...' />
                                    <input className='bg-success' type="submit" value="Login" />
                                </center>
                            </form>
                        </div>
                    )
                }
            }
        </UserConsumer>
    )
}
export default LoginAdmin;