const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const { register } = require('./controller/register');
const config = require('./config/key');
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


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/register', register);


app.listen(port, () => {
    console.log(port + ' listening');
})