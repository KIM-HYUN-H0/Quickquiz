import React, {useEffect, useState} from 'react';
import Signup from './Signup';
import { db, auth } from '../../config';
import firebase from 'firebase';
import axios from 'axios';

const Container = (props:any) => {

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [pw2, setPw2] = useState('');
    const [nickname, setNickname] = useState('');
    const [result, setResult] = useState('');

    const emailChange = (e: any) => {
        setEmail(e.target.value)
    }
    const PWChange = (e: any) => {
        setPw(e.target.value);
    }
    const PW2Change = (e: any) => {
        setPw2(e.target.value);
    }
    const NICKChange = (e: any) => {
        setNickname(e.target.value);
    }
    const handleKeyPress = (e: any) => {
        if (e.key === "Enter") {
            doRegister();
        }
    }
    const doRegister = () => {
        axios.post('http://localhost:4000/users/signup', {
            userid : email,
            password : pw
        })
        .then((result:any) => {
            console.log(result);
            //props.history.push('/info');

        })
        .catch((err:any) => {
            console.error(err);
        })
    }

    return(
        <>
            <Signup
            emailChange={emailChange}
            PWChange={PWChange}
            PW2Change={PW2Change}
            NICKChange={NICKChange}
            handleKeyPress={handleKeyPress}
            Register={doRegister}
            result={result}
            />

        </>
    )
}

export default Container;