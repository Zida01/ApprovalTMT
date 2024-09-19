const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
const dbConnect = require('./config/dbconnect')
const UserRouter = require('./routes/UserRoutes');
const RequestRouter = require('./routes/RequestRoutes');
const ApprovalRouter = require('./routes/ApprovalRoutes');

const app = express();
dbConnect()

app.use(express.json())

app.use('/api/v1/user', UserRouter)
app.use('/api/v1/request', RequestRouter)
app.use('/api/v1/approval', ApprovalRouter)


const PORT = process.env.PORT || 5000



app.listen(PORT, (req, res) => {
    console.log(`listen on port ${PORT}`)
});