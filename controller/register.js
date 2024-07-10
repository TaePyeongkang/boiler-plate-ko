const { User } = require("../models/User");

exports.register =  async (req, res) =>  {
    
    // 회원가입 할때 필요한 정보들을 client에서 가져오면
    // 가져온 정보들을 데이터 베이스에 저장한다.
    try {
        // console.log(req.body);
        const user = new User(req.body);
        const userInfo = await user.save();
        // console.log(userInfo,'userInfo');
        return res.status(200).json({ success: true })
    } catch (error) {
        console.error(error);
        return res.json({ success: false, error: error.errmsg });
    }

}