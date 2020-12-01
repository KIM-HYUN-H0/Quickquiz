import React, {useState, useEffect} from 'react';
import { auth } from '../../config';
import Login from './Login';
import axios from 'axios';
import { cpuUsage } from 'process';

const Container = (props:any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [result, setResult] = useState('');           //에러처리

    const IDChange = (e: any) => {
        setEmail(e.target.value);
    }
    const PWChange = (e: any) => {
        setPassword(e.target.value);
    }
    const handleKeyPress = (e: any) => {
        if (e.key === "Enter") {
            doLogin();
        }
    }
    const doLogin = () => {
        axios.post('http://localhost:4000/users/login', {
            userid : email,
            password : password
        },
        {withCredentials : true})
        .then((result:any) => {
            console.log(result);
            // props.history.push('/board/0');
        })
        .catch((err:any) => {
            console.error(err);
        })
    }
    return(
        <>
        <Login 
        IDChange={IDChange}
        PWChange={PWChange}
        handleKeyPress={handleKeyPress}
        Login={doLogin}
        // result={result}
        />
        </>
    )
}

export default Container;