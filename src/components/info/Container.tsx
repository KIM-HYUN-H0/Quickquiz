import React, { useEffect, useState } from 'react';
import { auth } from '../../config';
import Info from './Info';
import { Link } from "react-router-dom";
import { loadNick } from '../../modules/userControl';
import { RootState } from '../../modules';
import { useSelector, useDispatch } from 'react-redux';

const Container = (props:any) => {

    const nickname = useSelector((state:RootState) => state.userControl.nickname)
    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                dispatch(loadNick(user.displayName!,user.uid))
            }
            else {
                dispatch(loadNick('', ''))
            }
        })
    }, [])

    const logout = () => {
        console.log('로그아웃')
        auth.signOut().then(() => {
            dispatch(loadNick('', ''))
            props.history.push('/info')
        })
    }

    return (
        <>
            {nickname === '' ?
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