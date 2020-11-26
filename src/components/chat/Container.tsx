import React, { useEffect, useState, useRef } from 'react';
import { db, auth } from '../../config';
import Chat from './Chat';
import firebase from 'firebase';
import { RootState } from '../../modules';
import { useSelector, useDispatch } from 'react-redux';

const Container = (props: any) => {

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const messagesEnd = useRef<null | HTMLElement>(null);

    const nickname = useSelector((state: RootState) => state.userControl.nickname)

    useEffect(() => {
        if (nickname) {
            loadMessages();
        }
    }, [])

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    const loadMessages = () => {
        db.collection('chat')
            .doc(props.match.params.id)
            .collection('messages')
            .orderBy('write_time', 'asc')
            .onSnapshot((snapshot: any) => {
                snapshot.docChanges().forEach((change: any) => {
                    if (change.type === 'added') {
                        setMessages((prev: any) => prev.concat({ id: change.doc.id, data: change.doc.data() }))
                    }
                })
            })
    }

    const sendText = () => {
        if (nickname !== '') {
            db.collection('chat').doc(props.match.params.id)
                .collection('messages')
                .add({
                    content: inputText,
                    writer: nickname,
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

    const scrollToBottom = () => {
        if (messagesEnd.current) {
            messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return (
        <>
            <Chat
                nickname={nickname}
                messages={messages}
                inputText={inputText}
                setInputText={setInputText}
                sendText={sendText}
                keyPress={keyPress}
                messagesEnd={messagesEnd}
            />
        </>
    )
}

export default Container;