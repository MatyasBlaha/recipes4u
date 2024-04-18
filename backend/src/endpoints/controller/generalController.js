exports.freeEndpoint = async (req, res) => {
    res.json({
        message: "You are free to acccess"
    })
}

exports.authEndpoint = async (req, res) => {
    res.json({
        message: "You are authenticated"
    })
}