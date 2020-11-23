import React, {useEffect, useState} from 'react';
import {db, auth} from '../../config';

const Container = (props:any) => {

    useEffect(() => {
        db.collection('chat').doc(props.match.params.id)
        .collection('messages')
        .orderBy('write_time', 'desc')
        .get()
        .then((docs:any) => {
            docs.forEach((doc:any) => {
                console.log(doc.data());
            })
        })

    }, [])

    return(
        <>
        Container
        </>
    )
}

export default Container;