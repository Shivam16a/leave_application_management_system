const express = require('express');
const corse = require('cors');
const connectDB = require('./config/db.js');
const userRouter = require('./router/userRouter.js');
const staffRouter = require('./router/staffRouter.js');
const applicationRouter = require('./router/applicationRouter.js');
const dotenv = require('dotenv');


const corseOption = {
    origin: '*',
    method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
};

dotenv.config();
const app = express();
app.use(express.json());
app.use(corse(corseOption));

app.use('/api/user', userRouter);
app.use('/api/staff', staffRouter);
app.use('/api/application', applicationRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on PORT:', PORT);
    connectDB();
});