import React, { useEffect, useState } from 'react';
import { auth } from '../../config';
import Info from './Info';
import { Link } from "react-router-dom";

const Container = (props:any) => {

    const [userCheck, setUserCheck] = useState(0);
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setUserCheck(1);
                console.log(user)
            }
            else {
                
                setUserCheck(0);
            }
        })
    }, [])

    const logout = () => {
        console.log('로그아웃')
        auth.signOut().then(() => {
            props.history.push('/info')
        })
    }

    return (
        <>
            {userCheck === 0 ?
            <div>
                <Link to="/login" >로그인하러가기</Link>
                <Link to="/signup" >회원가입하러가기</Link>
                </div>
                :
                <Info 
                logout={logout}
                />
            }
        </>
    )
}

export default Container;