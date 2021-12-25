const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const jalali = require("jalaali-js");
const {restart} = require("./resetDyno");


exports.kimia = async (req, res, next) => {
    const adapter = new FileSync('db.json')
    const db = low(adapter)
    let ip = req.headers['x-forwarded-for']
    if (!ip.startsWith("91.98.100.19")) {
        console.log(ip)
        res.status(404).send("page not found")
    } else {
        //let d = new Date().getTime()
        let price = db.get('prices').value()
        //let du = new Date(price.lastUpdated.dateObj).getTime()
        //du += (48*3600*1000)
        //if(d>du) restart();
        res.json(price)
    }

}
exports.mamad = async (req, res, next) => {
    const adapter = new FileSync('db.json')
    const db = low(adapter)
    //let d = new Date().getTime()
    let price = db.get('prices').value()
    //let du = new Date(price.lastUpdated.dateObj).getTime()
    //du += (48*3600*1000)
    //if(d>du) restart();
    res.json(price)
}

