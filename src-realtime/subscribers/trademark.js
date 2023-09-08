exports.trademarkUpdated = io => ({itemId, userId}) => {
    console.log('Trademark updated', itemId, userId)

    const chanel = `user@${userId}`
    io.to(chanel).emit('trademarks-updated', userId)
}