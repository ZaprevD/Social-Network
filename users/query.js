let conn = require("../database");

getAllUsersQuery = () => {
    let query = "SELECT First_Name, Last_Name, Email FROM user";
    return new Promise((resolve, reject) => {
        conn.query(query, (error, results, fields) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}

getSpecificUserQuery = (email) => {
    let query = "SELECT * FROM user  WHERE Email = ?";
    return new Promise((resolve, reject) => {
        conn.query(query, [email], (error, results, fields) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}



changePictureQuery = (url, id) => {
    let query = "UPDATE user SET Image = ? WHERE Id = ?";
    return new Promise((resolve, reject) => {
        conn.query(query, [url, id], (error, results, fields) => {
            if(error){
                reject(error);
            }else{
                resolve();
            };
        });
    });
};


registerUserQuery = (body, pass) => {
    let query = "INSERT INTO user (First_Name, Last_Name, Email, Password) VALUES (?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
        conn.query(query, [body.firstName, body.lastName, body.email, pass], (error, results, fields) => {
            if (error) {
                console.log(error);
                reject(error)
            } else {
                resolve()
            }
        })
    })
}



getImageUrlQuery = (id) =>{
    let query = "SELECT Image FROM user WHERE Id = ?";
    return new Promise((resolve, reject) =>{
        conn.query(query, [id], (error, results, fields)=>{
            if(error){
                reject(error);
            }else{
                resolve(results);
            };
        });
    });
};






module.exports = {
    getAllUsersQuery, registerUserQuery,
    getSpecificUserQuery,changePictureQuery, getImageUrlQuery
}