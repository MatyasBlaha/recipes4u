exports.freeEndpoint = async (req, res) => {
    res.json({
        message: "You are free to access"
    })
}

exports.authEndpoint = async (req, res) => {
    res.json({
        message: "You are authenticated"
    })
}