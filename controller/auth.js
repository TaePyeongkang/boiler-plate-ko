const { User } = require("../models/User");

exports.auth = (req, res, next) => {

    // 인증처리 하는곳
    // 클라이언트 쿠키에서 토큰을 가져오기
    // 토큰을 복호화 한후, 유저를 찾는다
    // 유저 존재 인증 ok
    // 유저 없으면 인증 no

    // 클라이언트 쿠키에서 토큰을 가져오기
    let token = req.cookies.x_auth;

    // 토큰을 복호화 한후, 유저를 찾는다
    // const user = new User(req.body);
    User.findByToken(token, (err, user) => {
      if (err)  return err;
      if (!user) return res.json({ isAuth:false, error: true });

      req.token = token;
      req.user = user;
      next();
    });


}