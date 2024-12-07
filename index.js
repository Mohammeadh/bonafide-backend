const express = require('express')
const app = express()
const connectDb = require('./config/db')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const dotenv = require("dotenv")

app.use(express.json())
app.use(cors({ origin: true, credentials: true }))

app.use(bodyParser.urlencoded({ extended: false }))
dotenv.config()

connectDb().then(() => {

    app.use("/psna", require('./routes/login'))
    app.use("/psna/seceratory", require('./routes/seceratory'))
    app.use("/psna/apply", require('./routes/apply'))
    app.use("/psna/getcode", require('./routes/getcode'))
    app.use("/psna/notify", require('./routes/notify'))
    app.use("/psna/hod", require('./routes/hod'))
    app.use("/psna/cordinator", require('./routes/cordinator'))
    app.use("/psna/verification", require('./routes/verification'))
    app.use("/psna/check", require('./routes/check'))
    app.use("/psna/tutor", require('./routes/tutor'))
    app.use("/psna/tutorlist", require('./routes/tutorlist'))
    app.use("/psna/tech", require('./routes/techEdit'))
    app.use("/psna/forgotpassword", require('./routes/forgot'))
    app.use("/psna/forgotverify", require('./routes/forgotverify'))
    app.use("/psna/remove", require('./routes/remove'))
    app.use("/psna/addhistory", require('./routes/addhistory'))
    app.use(express.static(path.join(__dirname, 'build')));



    // app.get('/*', function (req, res) {
    //     try {
    //         res.sendFile(path.join(__dirname, 'build', 'index.html'));
    //     }
    //     catch (err) {
    //         res.send("error", err)
    //     }

    // })

    app.listen(3001, () => {
        console.log("run sucessfully")
    })
})
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });