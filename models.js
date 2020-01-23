
class User {
    constructor(id, firstName, lastName, email) {
        this.Id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}


class Post {
    constructor(postId, Text, created_On, Likes, userId, First_Name, Last_Name, Email, imageUrl) {
        this.postId = postId;
        this.Text = Text;
        this.created_On = created_On;
        this.Likes = Likes;
        this.userId = userId;
        this.First_Name = First_Name;
        this.Last_Name = Last_Name;
        this.Email  = Email;
        this.imageUrl  = imageUrl;
    }
}


module.exports = { User, Post };