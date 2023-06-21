const User = require("../model/User");

exports.search = async (req, res) => {
    try {
        let data = await User.find({
            "$or": [
                { username: { $regex: req.params.key } },
                { role: { $regex: req.params.key } }
            ]
        })
        data.length > 0 ? res.status(200).send({ success: true, msg: data }) : res.status(200).send({ success: true, msg: "Your search did not match any documents." })
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
}
