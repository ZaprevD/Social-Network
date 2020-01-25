import axios from "axios";

const auth = {
    'headers': {
        'Authorization': 'Bearer ' + localStorage.token
    }
}


export const login = (user) => {
    return axios.post("/login", user)
        .then(res => {
            console.log(res)
            localStorage.setItem("token", res.data);
            window.location.href = "/profile";
        })
        .catch(error => {
            console.log(error.message);
        })
}

export const register = (newUser) => {
    return axios.post("/register", newUser)
        .then(res => {
            console.log(res.data);
        })
        .catch(error => {
            console.log(error.message)
        })
}

export const getPostsForCurrentUser = (id) => {
    return axios.get(`/posts/user/${id}`, auth)
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err.message);
        })
}


export const getAllPosts = () => {
    return axios.get(`/posts/all`,auth)
        .then(res => {
            // console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err.message);
        })
}


export const postStatus = (text, id) => {
    return axios.post(`/post/new`, {
        Text: text,
        userId: id
    }, auth)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err.message);
        })
}

export const getImageUrl = (id) => {
    return axios.get(`/user/${id}/image`, auth)
        .then(res => {
            return res.data.Image;
        })
        .catch(err => {
            console.log(err.message);
        })
}

export const changePicture = (url, id) => {
    return axios.patch(`/change/picture`, {
        imgUrl: url,
        userId: id
    },auth)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err.message);
        })
};


export const deletePost = (id) => {
    return axios.delete(`/post/${id}`, auth)
    .then(res => {
        console.log(res);
    })
    .catch(error =>{
        console.log(error.message);
    })
}