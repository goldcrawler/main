const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')


exports.kimia = async (req, res, next) => {
    const adapter = new FileSync('db.json')
    const db = low(adapter)
    let ip = req.headers['x-forwarded-for']
    if (!ip.startsWith("188.0.241.9")){
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
