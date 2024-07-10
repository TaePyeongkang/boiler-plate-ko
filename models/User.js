const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 5
    },
    lastName: {
        type: String,
        maxLength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    }
});

UserSchema.pre('save', function (next)  {
    //req.body의 password가져오기위해
    const user = this;

    // password가 변화될때만 암호화 시킴
    if (user.isModified('password')) {
        // 비밀번호 암호화 시키기
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, (err, hash)=> {
                if (err) return next(err);

                user.password = hash;
                next();
            });
        });
    } else {
        // 비밀번호가 아닌 다른걸 바꿀때 next 시켜서 다른 미들웨어로 이동
        next();
    }
});


UserSchema.methods.comparePassword = function(plainPassword, cb) {
    //plainPassword Mios1234, 암호화된 비밀번호 "$2b$10$QGBdtVp/nA2OT5QBarCde2A6y4vlDBL9Vb7UnLuiMPd40UVhvK.2"
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if (err) return cb(err),
        console.log(isMatch,'isMatch');
        cb(null, isMatch);

    });
};

UserSchema.methods.generateToken = async function(cb) {
    
    try {
        const user = this;

        //jwt 이용해서 토큰 생성
        const token = jwt.sign(user._id.toJSON(), 'secretToken');
        user.token = token;
        
        const savedUser = await user.save();
        cb(null, savedUser);
        
    } catch (err) {
        if (err) return console.log(err);
    }

};

UserSchema.statics.findByToken =  function(token, cb) {
    try {
        const user = this;
        jwt.verify(token, 'secretToken', async function(err, decoded) {
            if (err) return console.log(err);
            const hasToken = await user.findOne({
                "_id": decoded, "token": token
            })
            console.log(hasToken);
            cb(null, hasToken)
        });
        
    } catch (error) {
        if (error) return console.error(error);
    }
};


// console.log(UserSchema,'UserSchema');

exports.User = mongoose.model('User', UserSchema);
