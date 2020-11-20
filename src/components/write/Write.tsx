import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Editor } from "@toast-ui/react-editor";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import Button from '@material-ui/core/Button';

const Write = (props:any) => {
    
    const {setTitle, setQuiz, uploadImage, content} = props;
    return (
        <>
            <TextField
                fullWidth
                style={{ margin: 'auto' }}
                label="제목 입력"
                onChange={e => setTitle(e.target.value)} />

            <Editor
                previewStyle="vertical"
                height="300px"
                initialEditType="wysiwyg"
                placeholder="질문 입력"
                ref={content}
                hooks={{
                    addImageBlobHook: async (blob, callback) => {
                        const upload = await uploadImage(blob);
                        callback(upload, 'alt text');
                        return false;
                    },
                }}
            />
            <Button variant="outlined" onClick={setQuiz}>작성</Button>

        </>
    )
}
export default Write;