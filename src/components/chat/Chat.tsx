import React from 'react';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import IconButton from "@material-ui/core/IconButton";
import './chat.css';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
    input: {
        bottom: 1,
        width: '90%',
        margin : 'auto'
    },
    
    messageWrapper : {
        position : 'absolute',
        left : 0,
        right : 0,
        height : '85%',
        overflow : 'auto',
    },
    inputWrapper: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        bottom : '50px',
        width: '100%',
        margin : 'auto',
        height : '100px',

    },

})

const Chat = (props: any) => {
    const classes = useStyles();

    const { setInputText, sendText, keyPress, messages, inputText } = props;
    return (
        <>
            <div className={classes.messageWrapper}>
                {messages.length > 0 ?
                    messages.map((message: any) => {

                        return (
                            <>
                                <div className="chat__message chat__message--to-me">
                                    <div className="chat__message-center">
                                        <h3 className="chat__message-username">{message.data.writer}</h3>
                                        <span className="chat__message-body">
                                            {message.data.content}
                                        </span>
                                    </div>
                                    <span className="chat__message-time">18:55</span>
                                </div>
                            </>
                        )
                    })
                    :
                    <>
                        대화를 입력해주세요
                    </>}
            </div>
            <div className={classes.inputWrapper}>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyPress={e => keyPress(e)}
                    size="small"
                    autoFocus
                />
                <IconButton>
                    <SendIcon onClick={sendText} />
                </IconButton>
            </div>
        </>
    )
}

export default Chat;