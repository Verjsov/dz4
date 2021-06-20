import React from 'react';


export function PostList(props) {

    return (
        (props.posts !== null) &&
        props.posts.map((post,index)=>(
            <div key={index} className="postStore">
                <div key={post.id} className="postBlock">
                    <div><b>Title post:</b> {post.title}</div>
                    <div><b>Text post:</b> {post.body}</div>
                    <div>
                        <button onClick={() => props.handleEditPost(post.id)}>Редактировать</button>
                        <button onClick={() => props.handleDeletePost(post.id)}>Удалить</button>
                    </div>
                </div>
            </div>
            )
        )
    );

}

