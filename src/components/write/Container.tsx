import React, { useEffect, useState, createRef } from 'react';
import { db, dbs } from '../../config'
import Write from './Write';
import firebase from 'firebase';

const Container = (props: any) => {

    const content: any = createRef();
    const [title, setTitle] = useState('');
    const [needs, setNeeds] = useState('');
    const [sauce, setSauce] = useState('');
    const [category, selectCategory] = useState('');
    const [source, setSource] = useState('');

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
        let idx = 0;
        db.collection('autoIncrement').doc('quiz')
            .get()
            .then((doc: any) => {
                idx = doc.data().idx;
            })
            .then(() => {
                const setData = {
                    author: 'default',
                    title: title,
                    content: content_true,
                    idx: idx,
                    date: firebase.firestore.FieldValue.serverTimestamp(),
                }
                db.collection('quiz').add(setData)
                    .then((res) => {
                        let words: any = [];
                        setData.title.split(' ').map((word: any) => {
                            for (let i = 0; i < word.length; i++) {
                                for (let j = i + 1; j <= word.length; j++) {
                                    if (words.findIndex((a: any) => a.title === word.slice(i, j)) === -1) {
                                        words.push({ title: word.slice(i, j), idx: setData.idx })
                                    }
                                }
                            }
                        })
                        words.map((word: any) => {
                            db.collection('quiz_title_search').where('title', '==', word.title)
                                .get()
                                .then((result: any) => {
                                    if (result.size > 0) {
                                        result.forEach((b: any) => {
                                            db.collection('quiz_title_search').doc(b.id)
                                                .update({ idx: [...b.data().idx, word.idx] })
                                        })
                                    }
                                    else {
                                        db.collection('quiz_title_search')
                                            .add({ title: word.title, idx: [word.idx] })
                                    }
                                })
                        })
                        props.history.push('/quiz');
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            })
            .then(() => {
                db.collection('autoIncrement').doc('quiz')
                    .update({ idx: firebase.firestore.FieldValue.increment(1) })
            })
        //idx 부른 후 저장 .
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