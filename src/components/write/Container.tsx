import React, { useEffect, useState, createRef } from 'react';
import { db, dbs } from '../../config'
import Write from './Write';
import firebase from 'firebase';
import { RootState } from '../../modules';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Container = (props: any) => {

    const content: any = createRef();
    const [title, setTitle] = useState('');

    const nickname = useSelector((state: RootState) => state.userControl.nickname)

    const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const uploadImage = (blob: any) => {
        return dbs
            .child(uuidv4())
            .put(blob)
            .then(async (snapshot) => {
                let returnURL = '';
                await snapshot.ref.getDownloadURL().then((URL) => {
                    returnURL = URL;
                })
                return returnURL;
            })
    }

    const setQuiz = () => {
        const content_true = content.current.getInstance().getHtml();

        axios.post('http://localhost:4000/quiz/quizWrite', {
            author : nickname,
            title : title,
            content : content_true,
        })
        .then((result:any) => {
            console.log(result);
            // props.history.push('/quiz');
        })
        .catch((err:any) => {
            console.error(err);
        })
    }

    return (
        <>
            <Write
                setTitle={setTitle}
                uploadImage={uploadImage}
                content={content}
                setQuiz={setQuiz}
            />
        </>
    )
}

export default Container;