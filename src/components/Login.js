import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    let history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);


        if(json.success) {
            //save the auth token and redirect
            localStorage.setItem('token',json.AuthToken);
            props.showAlert("Logged in Successfully","success");
            history.push('/');
        }
        else{
            // alert("Enter Correct credentials");
            props.showAlert("Invalid Credentials", "danger");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    return (
        <form onSubmit={handleClick} className="my-4">
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary" >Login</button>
        </form>
    )
}

export default Login