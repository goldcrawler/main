let token = '1df53a57-cdf0-47db-9287-db168e9e8716';
let appName = 'gldc2';

let request = require('request');

exports.restart = async ()=>{
    request.delete(
        {
            url: 'https://api.heroku.com/apps/' + appName + '/dynos/',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.heroku+json; version=3',
                'Authorization': 'Bearer ' + token
            }
        },
        function(error, response, body) {
            console.log(error);
            console.log("restarted");
        }
    );

}
