import React, { useState } from 'react';
import "./../css/CreatePost.css";
import axiosServices from '../api/axiosServices';
import { createPost } from '../api/postApi';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

    

    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });

    const navigate = useNavigate();

    const onChangeFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // .then().catch() 방식 -> try {await axios.post(...) catch { ... }}
    const onClickSubmit = async (e) => {
        e.preventDefault(); // 페이지 새로고침 막기

        try {
            const response = await createPost(formData);
            console.log('게시글 등록 성공:',response.data);
            navigate('/');
            
        } catch (error) {
            console.error('게시글 등록 실패:',error);
        }
    };
    

    return (
       <div className="create-post-container">
            <h1 className="create-post-title">게시글 작성</h1>
            <form className="create-post-form" onSubmit={onClickSubmit}>
                <div className="form-group">
                    <label htmlFor="title">제목</label>
                    <input id="title" name="title" type="text" placeholder="제목을 입력하세요" onChange={onChangeFormData} />
                </div>
                <div className="form-group">
                    <label htmlFor="content">내용</label>
                    <textarea id="content" name="content" placeholder="내용을 입력하세요" onChange={onChangeFormData}/>
                </div>
                <button type="submit" className="submit-button">등록</button>
            </form>
            
        </div>
    )
}

export default CreatePost;