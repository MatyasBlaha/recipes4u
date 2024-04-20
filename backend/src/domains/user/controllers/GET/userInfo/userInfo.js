const jwt = require("jsonwebtoken");
const User = require("../../../model/UserModel");


exports.userInfo = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decodedToken.userId;


        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }


        return res.status(200).json({
            name: user.name,
            email: user.email,
        });

    } catch (error) {
        console.error('error while getting info about user:', error);
        res.status(500).json({ message: 'error while getting info about user' });
    }
};