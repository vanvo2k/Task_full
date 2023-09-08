module.exports = (req, res, next) => {
    req.setEncoding('utf8')

    let data = ''

    req.on('data', function (chunk) {
        data += chunk

        console.log(chunk)
    })

    req.on('end', function () {
        req.rawBody = data

        console.log(data)

        next()
    })
}
