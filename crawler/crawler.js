const fetch = require("node-fetch");
const JSSoup = require('jssoup').default;
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const jalali = require("jalaali-js");
const {restart} = require("../controller/resetDyno");


module.exports = getPrices = async () => {
    let now = new Date(new Date().getTime() + 3.5 * 60 * 60 * 1000)
    let hour = now.getHours()
    if (hour > 19 || hour < 11) {
        return null
    } else {
        const adapter = new FileSync('db.json')
        const db = low(adapter)
        db.defaults({prices: {}})
            .write()
        let ounce, bazartehran, geram18, jad_sell, jad_buy, gad_sell, gad_buy, nim_sell, nim_buy, rob_sell, rob_buy,
            grm_sell, grm_buy
        let prices = db.get('prices').value()
        try {
            let html = await fetch("https://tala.ir/coin");
            html = await html.text();
            let soup = new JSSoup(html);
            const rc = t => t.replace(/,/g, "");
            const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
            let row = soup.find('tr', "gold_18k");
            let secondSoup = new JSSoup(row)

            row = soup.find('tr', "gold_ounce");
            secondSoup = new JSSoup(row)
            let value = p2e(rc(secondSoup.find("td", "value").text))
            let dot = value.indexOf(".");
            if (dot > 1) {
                let int = value.slice(0, dot);
                let decimal = value.slice(dot + 1, value.length)
                ounce = parseInt(int) + (0.1) * parseInt(decimal[0])
            } else {
                ounce = parseInt(value)
            }
            if (ounce > 0) prices.ounce = {
                name: 'ounce',
                caption: 'اونس جهانی',
                value: ounce,
            }


            row = soup.find('tr', "gold_bazaruser");
            secondSoup = new JSSoup(row)
            bazartehran = (parseInt(p2e(rc(secondSoup.find("td", "value").text))) * 10) + 150000
            if (bazartehran > 0) prices.bazartehran = {
                name: 'bazartehran',
                caption: 'مظنه مثقال',
                value: bazartehran,
            }

            geram18 = Math.trunc(bazartehran / (4331.8)) * 1000
            if (geram18 > 0) prices.geram18 = {
                name: 'geram18',
                caption: 'گرم 18 عیار',
                value: geram18,
            }

            let ex = soup.find("a", {title: "نرخ سکه امامی طرح جدید"}, "سکه امامی طرح جدید")
            let td = ex.parent.parent
            jad_buy = parseInt(p2e(rc(td.contents[2].text))) * 10
            jad_sell = parseInt(p2e(rc(td.contents[3].text))) * 10
            if (jad_buy > 0) prices.jad_buy = {
                name: 'jad_buy',
                caption: 'سکه طرح جدید(امامی) خرید',
                value: jad_buy,
            }
            if (jad_sell > 0) prices.jad_sell = {
                name: 'jad_sell',
                caption: 'سکه طرح جدید(امامی) فروش',
                value: jad_sell,
            }

            ex = soup.find("a", {title: "نرخ سکه نیم"}, "سکه نیم")
            td = ex.parent.parent
            nim_buy = parseInt(p2e(rc(td.contents[2].text))) * 10
            nim_sell = parseInt(p2e(rc(td.contents[3].text))) * 10
            if (nim_buy > 0) prices.nim_buy = {
                name: 'nim_buy',
                caption: 'نیم سکه خرید',
                value: nim_buy,
            }
            if (nim_sell > 0) prices.nim_sell = {
                name: 'nim_sell',
                caption: 'نیم سکه فروش',
                value: nim_sell,
            }

            ex = soup.find("a", {title: "نرخ ربع سکه"}, "ربع سکه")
            td = ex.parent.parent
            rob_buy = parseInt(p2e(rc(td.contents[2].text))) * 10
            rob_sell = parseInt(p2e(rc(td.contents[3].text))) * 10
            if (rob_buy > 0) prices.rob_buy = {
                name: 'rob_buy',
                caption: 'ربع سکه خرید',
                value: rob_buy,
            }
            if (rob_sell > 0) prices.rob_sell = {
                name: 'rob_sell',
                caption: 'ربع سکه فروش',
                value: rob_sell,
            }

            ex = soup.find("a", {title: "نرخ سکه گرمی"}, "سکه گرمی")
            td = ex.parent.parent
            grm_buy = parseInt(p2e(rc(td.contents[2].text))) * 10
            grm_sell = parseInt(p2e(rc(td.contents[3].text))) * 10
            if (grm_buy > 0) prices.grm_buy = {
                name: 'grm_buy',
                caption: 'سکه گرمی خرید',
                value: grm_buy,
            }
            if (grm_sell > 0) prices.grm_sell = {
                name: 'grm_sell',
                caption: 'سکه گرمی فروش',
                value: grm_sell,
            }

            row = soup.find('tr', "sekke-gad");
            secondSoup = new JSSoup(row)
            gad_buy = gad_sell = parseInt(p2e(rc(secondSoup.find("td", "value").text))) * 10
            if (gad_sell > 0) {
                prices.gad_sell = {
                    name: 'gad_sell',
                    caption: 'سکه طرح قدیم فروش',
                    value: gad_sell,
                }
                prices.gad_buy = {
                    name: 'gad_buy',
                    caption: 'سکه طرح قدیم خرید',
                    value: gad_buy,
                }
            }
            let jDate = jalali.toJalaali(now)
            let digitFixer = d => d.toString().length === 2 ? d : "0" + d.toString()
            prices.lastUpdated = {
                dateObj: new Date(),
                date: `${jDate.jy}/${jDate.jm}/${jDate.jd}`,
                time: `${digitFixer(now.getHours())}:${digitFixer(now.getMinutes())}:${digitFixer(now.getSeconds())}`
            }
        } catch (e) {
            console.log("error");
            console.log(e);
            restart()
        }
        db.set('prices', prices)
            .write()
    }
}

module.exports = getPrices()
