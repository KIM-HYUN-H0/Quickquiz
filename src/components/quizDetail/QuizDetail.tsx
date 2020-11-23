import React from 'react';
import moment from 'moment';
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";

const quizDetail = (props: any) => {

    const {chatMaker} = props;
    const { date, idx, title, content, author} = props.data;

    return (
        <>
            {props.data.idx === 0 ?
                null
                :
                <>
                    <div>{idx}</div>
                    <div>{moment(date.toDate()).format('YYYY-MM-DD HH:mm')}</div>
                    <div>{title}</div>
                    
                    <Viewer initialValue={content} />
                    <div>{author}</div>
                    <button onClick={chatMaker}>멘토되기</button>
                </>}

        </>
    )
}

export default quizDetail;