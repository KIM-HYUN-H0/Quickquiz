import React from 'react';

const Info = (props:any) => {
    const {logout} = props;
    return(
        <>
        Info
        <button onClick={logout}>로그아웃</button>
        </>
    )
}

export default Info;