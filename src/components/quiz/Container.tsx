import React, { useEffect, useState } from 'react';
import Quiz from './Quiz';
import { db } from '../../config';

const Container = () => {
    const [data, setData] = useState([]);


    useEffect(() => {
        db.collection('quiz').get()
            .then((docs: any) => {
                let temp: any = [];
                docs.forEach((doc: any) => {
                    temp.push(doc.data());
                })
                setData(temp);

            })
    }, [])

    return (
        <>
            <Quiz
                data={data}
            />
        </>
    )
}

export default Container;