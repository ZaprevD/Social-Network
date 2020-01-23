let conn = require("../database");

getPostsFromSpecificUserQuery = (id) => {
    let query = "SELECT * FROM post WHERE userId = ?";
    return new Promise((resolve, reject) => {
        conn.query(query, [id], (error, results, fields) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}

deletePostQuery = (id) => {
    let query = "DELETE FROM post WHERE PostId = ?";
    return new Promise((resolve, reject) => {
        conn.query(query, [id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        })
    })
}

postStatusQuery = (body) => {
    let query = "INSERT INTO post (Text, Created_On, userId) VALUES(?, NOW(), ?)";
    return new Promise((resolve, reject) => {
        conn.query(query, [body.Text, body.userId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        })
    })
}

getAllPostsQuery = () => {
    let query = "SELECT * FROM post JOIN user ON userId = user.Id";
    return new Promise((resolve, reject) => {
        conn.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    })
}


module.exports = {getPostsFromSpecificUserQuery, deletePostQuery, postStatusQuery, getAllPostsQuery}