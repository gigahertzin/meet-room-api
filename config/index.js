const dotenv = require("dotenv")
dotenv.config()
module.exports = {
    "db" : `mongodb+srv://${process.env.USER}:${process.env.PASS}@chatcatdb.odn9j.mongodb.net/${(process.env.MODE == "development")? process.env.DEVDB: process.env.PRODDB}`,
    "port" : process.env.PORT || 2000
}