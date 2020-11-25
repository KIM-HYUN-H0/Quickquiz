import React, { useEffect, useState } from 'react';
import { db, auth } from '../../config';
import Chat from './Chat';
import firebase from 'firebase';

const Container = (props: any) => {

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [nick, setNick] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged((user:any) => {
            if(user) {
                setNick(user.displayName);
                loadMessages();
            }
            else {
                alert('로그인 ㄱㄱ');
            }
        })
    }, [])

    const loadMessages = () => {
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
    }

    const sendText = () => {
        if(nick !== '') {
            db.collection('chat').doc(props.match.params.id)
            .collection('messages')
            .add({
                content: inputText,
                writer: nick,
                write_time: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then((result: any) => {
                setInputText('');
            })
            .catch((err: any) => {
                console.error(err);
            })
        }
        
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