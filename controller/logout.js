const { User } = require("../models/User");

exports.logout = async(req, res) => {
    
    try {
        const logout = await User.findOneAndUpdate(
            { _id: req.user._id},
            {token: ""}
        );    
        return res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, error });
    }
}