import React, {useEffect, useState} from 'react';
import {PostForm} from "./PostForm";
import {PostList} from "./PostList";
import axios from 'axios';
import {Loading} from "./Loading";

export function Posts() {
    const [editPostID, setEditPostID] = useState(null);
    const [deletePostID, setDeletePostID] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        axios.get("https://60bb880442e1d00017620c95.mockapi.io/Posts/")
            .then((response) => {
                setCounter(response.data.length);
                setPosts(response.data);
                setTimeout(()=>{
                    setIsLoading(false);
                },2000)
            })
            .catch((error) => {
                setIsLoading(false);
            });
    },[editPostID,deletePostID,counter]);

    const handleEditPost = (id) => {
        setEditPostID(id);
    }

    const handleDeletePost = (id) => {
        setIsLoading(true);
        let foundInd = posts.findIndex((el)=>el.id === deletePostID);
        posts.splice(foundInd,1);
        setCounter(counter - 1);
        axios.delete("https://60bb880442e1d00017620c95.mockapi.io/Posts/" + id)
            .then( (response) => {
                setTimeout(()=>{
                    setIsLoading(false);
                },2000)
            })
            .catch((error) => {
                setIsLoading(false);
            });
    }

    const onSubmit = (values) => {
        if (editPostID === null) {
            let newPost = {
                createdAt: new Date().toISOString(),
                title: values.title,
                body:values.body
            }
            setIsLoading(true);
            axios.post("https://60bb880442e1d00017620c95.mockapi.io/Posts/", newPost)
                .then( (response) => {
                    setTimeout(()=>{
                        setIsLoading(false);
                        setCounter(counter + 1);
                    },1000)
                })
                .catch((error) => {
                    setIsLoading(false);
                });
        }
        else {
            let newPost = {
                id: editPostID,
                createdAt: new Date().toISOString(),
                title: values.title,
                body: values.body
            }
            let foundInd = posts.findIndex((el) => el.id === editPostID);
            if (foundInd > -1) {
                posts[foundInd] = newPost;
                setIsLoading(true);
                axios.put("https://60bb880442e1d00017620c95.mockapi.io/Posts/" + editPostID, newPost)
                    .then((response) => {
                        setPosts(posts);
                        setTimeout(()=>{
                            setIsLoading(false);
                            setEditPostID(null);
                        },1000)
                    })
                    .catch((error) => {
                        setIsLoading(false);
                    });
            }
        }
    };

    return (
        <div>
            <PostForm editedPost = {editPostID === null ? null: posts[posts.findIndex(el => el.id === editPostID)]}
                handleCancel = {() => handleEditPost(null)}
                handleSubmit = {onSubmit}
            />
            {
                isLoading
                    ? <Loading />
                    : <PostList posts={posts} handleEditPost={handleEditPost} handleDeletePost={handleDeletePost} />
            }
        </div>
    );
}
