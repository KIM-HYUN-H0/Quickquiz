import React, { useEffect, useState } from 'react';
import { db, auth } from '../../config';
import Chat from './Chat';
import firebase from 'firebase';

const Container = (props: any) => {

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    // useEffect(() => {
    //     db.collection('chat').doc(props.match.params.id)
    //         .collection('messages')
    //         .orderBy('write_time', 'desc')
    //         .get()
    //         .then((docs: any) => {
    //             let temp: any = [];
    //             docs.forEach((doc: any) => {
    //                 temp.push({ id: doc.id, data: doc.data() });
    //             })
    //             setMessages(temp);
    //         })

    // }, [])

    useEffect(() => {
        db.collection('chat')
        .doc(props.match.params.id)
        .collection('messages')
        .onSnapshot((snapshot:any) => {
            snapshot.docChanges().forEach((change:any) => {
                if(change.type === 'added') {
                    setMessages((prev:any) => prev.concat({id : change.doc.id, data : change.doc.data()}))
                }
            })
        })
    }, [])

    const sendText = () => {
        db.collection('chat').doc(props.match.params.id)
            .collection('messages')
            .add({
                content: inputText,
                writer: 'default',
                write_time: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then((result: any) => {
                setInputText('');
            })
            .catch((err: any) => {
                console.error(err);
            })
    }

    const keyPress = (e: any) => {
        if (e.key === 'Enter') {
            sendText();
        }
    }

    return (
        <>
            <Chat
                messages={messages}
                inputText={inputText}
                setInputText={setInputText}
                sendText={sendText}
                keyPress={keyPress}
            />
        </>
    )
}

export default Container;