const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dramayeong:Mios1234@cluster0.nvuabhv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    // useNewUrlParser:true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: true,
}).then(() => {
    console.log('mongoDb Connected...');
}).catch(err => {
    console.log(err);
})



app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(port + ' listening');
})