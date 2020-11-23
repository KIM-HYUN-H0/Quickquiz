import React, { useState, useEffect } from 'react';
import QuizDetail from './QuizDetail';
import { db } from '../../config';

const Container = (props: any) => {

    const [data, setData] = useState({
        date : '',
        title : '',
        idx : 0,
        content : '',
        author : ''
    });

    useEffect(() => {
        db.collection('quiz')
            .where('idx', '==', Number(props.match.params.idx))
            .get()
            .then((docs: any) => {
                if (docs.size === 0) {
                    console.error('Page not found');
                }
                else {
                    docs.forEach((doc: any) => {
                        setData(doc.data());
                    })
                }
            })
            .catch((err) => {
                console.error(err);
            })
    }, [])
    const chatMaker = () => {
        db.collection('chat').add({
            join : ['KLJIkZv0HvNIpSChz8Y6S7KQLmM2', 'test4'],
            quizidx : Number(props.match.params.idx)
        })
        .then((result:any) => {
            props.history.push(`/chat/${result.id}`);
        })
    }

    return (
        <>
            <QuizDetail 
            data={data}
            chatMaker={chatMaker}
            />
        </>
    )
}

export default Container;