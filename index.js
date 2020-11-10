const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const {db, port} = require("./config/index")
const router = require("./routes/User")
const app = express()

mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("called"))


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(router)

app.get('/', (req, res) => {
    res.send("Hello")
}).listen(port, () => console.log("Connected to " + port))
