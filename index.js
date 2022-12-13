const express = require('express')
const app = express();
//const morgan = require('morgan');
const dotenv = require('dotenv');
//const helmet = require('helmet');
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

// mongoose.connect('mongodb://localhost:27017/chartapp',
// {useNewUrlParser: true, useUnifiedTopology: true },
// () => {
//     console.log('conected to mongoDB')
// });

mongoose.connect('mongodb://0.0.0.0:27017/chartapp',
{useNewUrlParser: true, useUnifiedTopology: true },)
.then(() => {
    console.log('mongodb connected')
})
.catch(err =>{
    console.log(err)
})

//midleware

app.use(express.json());
//app.use(helmet());
//app.use(morgan('common'));

app.get('/', (req,res) => {
    res.status(200).json('wellcom to home page')
})

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts',postRoute);



app.listen(PORT, () => console.log('server running on port' + PORT));