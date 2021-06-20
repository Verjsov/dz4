import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import {Loading} from "./Loading";
import {PostList} from "./PostList";
import axios from "axios";

export function PostForm(props) {

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

    const submit = (values) => {
        props.handleSubmit(values);
        reset({ title: '',body: '' } );
    };

    const cancel = (values) => {
        props.handleCancel(values);
        reset({ title: '',body: '' } );
    };

    useEffect(() => {
        if (props.editedPost) {
            setValue( 'title', props.editedPost.title);
            setValue('body', props.editedPost.body);
        }
    }, [props.editedPost,setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="form" >
            <div>Status Form: {props.editedPost == null? 'Create': 'Edit' }</div>
            <div className="wrap">
                <div className="lab">Title</div>
                <div>

                    <input style={{'width':'50rem'}} type="text" {...register("title", { required: "Введите title" })} />

                    {errors.title && (
                        <div style={{color: "red"}}>{errors.title.message}</div>
                    )}

                </div>
            </div>
            <div className="wrap">
                <div className="lab">Text</div>
                <div>

                    <input style={{'width':'50rem'}} type="text" {...register("body", { required: "Введите body" })}>

                    </input>
                    {errors.body && (
                        <div style={{color: "red"}}>{errors.body.message}</div>
                    )}
                </div>
            </div>
            <button>{props.editedPost == null? 'Отправить': 'Сохранить'} </button>
            {props.editedPost && (
                <button onClick={cancel}>Отмена</button>
            )}

        </form>
    );

}

PostForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    title: PropTypes.string,
    body: PropTypes.string,
};

PostForm.defaultProps = {
    editPost: null,
    title: '',
    body: ''
};



