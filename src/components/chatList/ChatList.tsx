import React from 'react';
import { Link } from "react-router-dom";

const ChatList = (props: any) => {
    const { list } = props;
    return (
        <>
            {list.length > 0 ?
                list.map((chat: any) => {
                    return (
                        <Link to={`/chat/${chat.idx}`}
                            style={{ textDecoration: 'none', color: 'black' }}>
                            <div>
                                {chat.data.quizidx} 번방 채팅
                            {chat.data.join.map((human: any) => {
                                    return (
                                        <div>
                                            {human} 님
                                        </div>
                                    )
                                })}

                            </div>
                        </Link>
                    )
                })
                :
                null
            }
        </>
    )
}

export default ChatList;