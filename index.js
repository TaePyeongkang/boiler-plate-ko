const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const config = require('./config/key');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user');
mongoose.connect(config.mongoUri, {
    // useNewUrlParser:true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: true,
}).then(() => {
    console.log('mongoDb Connected...');
}).catch(err => {
    console.log(err);
})

app.use(express.json());
app.use(cookieParser());
app.use('/api/users', userRouter);

app.get('/',  (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(port + ' listening');
})