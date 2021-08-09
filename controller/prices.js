const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const jalali = require("jalaali-js");


exports.kimia = async (req, res, next) => {
    const adapter = new FileSync('db.json')
    const db = low(adapter)
    let ip = req.headers['x-forwarded-for']
    if (!ip.startsWith("91.98.100.195")){
        console.log(ip)
        res.status(404).send("page not found")
    }else {
    let price = db.get('prices').value()

    res.json(price)
    }
}
exports.mamad = async (req, res, next) => {
    const adapter = new FileSync('db.json')
    const db = low(adapter)
    let price = db.get('prices').value()
    res.json(price)
}

