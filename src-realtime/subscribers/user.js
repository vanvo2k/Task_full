exports.userChangeScopes = io => userId => {
    if (!userId) {
        return
    }

    const chanel = `user@${userId}`
    io.to(chanel).emit('heart-beat', userId)
}

exports.userChangeMembership = io => userId => {
    if (!userId) {
        return
    }

    const chanel = `user@${userId}`
    io.to(chanel).emit('heart-beat', userId)

    setTimeout(() => {
        io.to(userId).emit('notification-bar', userId)
    }, 5000)
}

exports.newSession = io => userId => {
    if (!userId) {
        return
    }

    const chanel = `user@${userId}`
    io.to(chanel).emit('heart-beat', userId)
}
