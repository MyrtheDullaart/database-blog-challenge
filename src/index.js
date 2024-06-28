const prisma = require("./db");

async function getAllUsers() {
    const users = await prisma.user.findMany()

    return users
}

async function getUserById(userId) {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        }
    })

    return user
}

async function getUserProfile(userId) {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        },
        include: {
            profile: true
        }
    }) 

    return user
}

async function updatePost(postId) {
    const updatedUser = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            content: 'some test content'
        }
    })

    return updatedUser
}

async function deletePost(postId) {
    const deletedPost = await prisma.post.delete({
        where: {
            id: postId
        }
    })

    console.log(deletedPost)
}

getAllUsers()
getUserById(2)
getUserProfile(1)
updatePost(1)
deletePost(3)