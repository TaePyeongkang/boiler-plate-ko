const { LEGAL_TCP_SOCKET_OPTIONS } = require("mongodb");
const { User } = require("../models/User");

exports.login =  async (req, res) =>  {
    
    // 요청된 이메일을 DB에서 찾는다
    // 해당 이메일이 있으면 비밀번호가 일치하는지 확인
    // 위에 조건이 유효하다면 토큰 생성
   
    try {
        // console.log(req.body);
        
        // 해당 이메일 있는지 확인
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.json({ success: false, error: "해당 유저가 없습니다." });
        };
        
        // 비밀번호 일치하는지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) 
                return res.json({ success: false, error:"비밀번호가 틀렸습니다."});

            // 비밀번호 일치하면 토큰 생성하기
            
            user.generateToken((err, user) => {
                if (err) return res.json({
                    success: false,
                    error: err
                });
                // 토큰을 쿠키에 저장한다.
                res.cookie('x_auth', user.token)
                .status(200)
                .json({ loginSuccess: true,
                    userId: user._id
                });
            }) 
        });
        

    } catch (error) {
        console.error(error);
        return res.json({ success: false, error: error.errmsg });
    }

}