import React, { useState, useEffect } from 'react';
import { auth, db } from '../../config';
import ChatList from './ChatList';

const Container = () => {

    const [list, setList] = useState([]);
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('chat').where('join', 'array-contains', user.uid)
                    .get()
                    .then((docs: any) => {
                        let temp: any = [];
                        docs.forEach((doc: any) => {
                            temp.push({idx : doc.id, data : doc.data()});
                        })
                        setList(temp);
                    })
            }
            else {
                console.log('뿌려주지않ㄴ는다')
            }
        })
    }, [])

    return (
        <>
            <ChatList 
            list={list}
            />
        </>
    )
}

export default Container;