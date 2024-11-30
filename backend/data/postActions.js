let { posts } = require("../data/PostsUsersStoredData");
const { v4: generateId } = require("uuid");

function getAllPosts() {
    console.log("All posts get!")
    return posts
}

function getSinglePost(id) {
    const postIndex = posts.findIndex((post) => post.id == id);
    console.log("Get single post with index " + postIndex)
    const singlePost = posts[postIndex];
    return singlePost;
}

function createNewPost(postBody) {
    const newPost = {
        "id": generateId(),
        ...postBody
    }
    posts.push(newPost);
    console.log("New post created!");

    return newPost
}

function updatePost(id, newBody){

    const postIndex = posts.findIndex((post) => post.id == id);
    console.log("Edit single post with id " + id)

    const editPost = {
        "id": id,
        ...newBody
    }
    posts[postIndex] = editPost;

    return editPost;
}

function deletePost(id){
    const postIndex = posts.findIndex((post) => post.id == id);
    console.log("Delete single post with id " + postIndex)
    posts = posts.filter((post) => post.id != id);
}
exports.getAllPosts = getAllPosts;
exports.getSinglePost = getSinglePost;
exports.createNewPost = createNewPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;