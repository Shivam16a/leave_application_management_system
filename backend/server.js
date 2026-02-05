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
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        'default-src \'self\'; script-src \'self\' https://cdn.jsdelivr.net; style-src \'self\' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com \'unsafe-inline\'; font-src \'self\' https://cdnjs.cloudflare.com; img-src \'self\' data:;'
    );
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader(
        'Permissions-Policy',
        'camera=(), microphone=(), geolocation=()'
    );
    next();
});

app.use('/api/user', userRouter);
app.use('/api/staff', staffRouter);
app.use('/api/application', applicationRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on PORT:', PORT);
    connectDB();
});