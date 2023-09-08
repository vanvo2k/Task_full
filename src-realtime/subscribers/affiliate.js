exports.registrationConfirmed = io => userId => {
    console.log('Registration confirmed', userId)

    const chanel = `user@${userId}`
    io.to(chanel).emit('affiliate-registration-confirmed', userId)
}

exports.affiliateStatisticsChanged = io => userId => {
    console.log('Affiliate statistics changed', userId)

    const chanel = `user@${userId}`
    io.to(chanel).emit('affiliate-statistic-changed', userId)
}