import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './../css/Home.css';
import axiosServices from '../api/axiosServices';
import { fetchPostList } from '../api/postApi';

const Home = () => {

    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    const getPostList = async () => {
        try {
            const response = await fetchPostList(currentPage - 1, postsPerPage);
            console.log('게시글 가져오기 성공:', response.content);
            setPosts(response.content);
            setTotalPages(response.totalPages);
        } catch(error) {
            console.error('게시글 가져오기 실패:', error);
        }
    }

    useEffect(() => {
        getPostList();
    }, [currentPage]);

    //전체 페이지 번호 배열 생성
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    //페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    return (
        <div className="home-container">
            <h1 className="home-title">게시글 목록</h1>
            <div className="posts-list">
                {posts.map(post => (
                    <div key={post.id} className="post-card"> 
                        <h2 className="post-title">
                            <Link to={`/post/${post.id}`}>{post.title}</Link>
                        </h2>
                        <p className="post-content">{post.content}</p>
                    </div>
                ))}
            </div>

            {/* 페이지 번호 네비게이션 */}
            <div className="pagination">
                {pageNumbers.map((number) => {
                    <button
                        key={number}
                        className={`page-btn ${number === currentPage ? 'active' : ''}`}
                        onClick={() => handlePageChange(number)}
                    >
                        {number}
                    </button>
                })}

                <Link to="/create" className="create-link">게시글 작성하기</Link>
            </div>
        </div>
    )
}

export default Home;