let token = '1df53a57-cdf0-47db-9287-db168e9e8716';
let appName = 'gldc2';
const fetch = require('node-fetch');


exports.restart = async ()=>{
    fetch('https://api.heroku.com/apps/' + appName + '/dynos/', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.heroku+json; version=3',
            'Authorization': 'Bearer ' + token
        }    })
        .then(res => res.json())
        .then(json => {
            console.log("server restarted");
            console.log(json);
        })
        .catch(error => {
            console.log(error);
        });
}
