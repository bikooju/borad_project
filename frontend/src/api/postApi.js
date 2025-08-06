import axiosServices from "./axiosServices"

export const fetchPostList = async (page, size) => {
    const response = await axiosServices.get('/posts', {
        params: { page, size }
    });
    return response.data;
};

export const fetchPostById = async (id) => {
    const response = await axiosServices.get(`/posts/${id}`);
    return response.data;
}

export const createPost = async (data) => {
    const response = await axiosServices.post('/posts', data);
    return response.data;
}

export const deletePost = async (id) => {
    await axiosServices.delete(`/posts/${id}`);
}

export const updatePost = async (id, updatedData) => {
    const response = await axiosServices.put(`/posts/${id}`, updatedData);
    return response.data;
}