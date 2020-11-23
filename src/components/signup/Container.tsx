import React, {useEffect, useState} from 'react';
import Signup from './Signup';
import { db, auth } from '../../config';
import firebase from 'firebase';

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
        auth.createUserWithEmailAndPassword(email, pw)
            .then((result) => {

                db.collection('users').doc(result.user!.uid).set({
                    signUpDate : firebase.firestore.FieldValue.serverTimestamp(),
                    displayName : nickname
                })
                props.history.push('/info');
                
                return result.user?.updateProfile({
                    displayName : nickname
                })
                
                
            })
            .catch(err => {
                const errCode = err.code;
                const errMessage = err.message;
                console.log(errCode, errMessage);
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