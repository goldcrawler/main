
const fetch = require('node-fetch');
let flag = 0;

exports.restart = async ()=>{
    let token, appName
    if (process.env.svDomain==="gldc2"){
        token = '1df53a57-cdf0-47db-9287-db168e9e8716';
        appName = 'gldc2';
    }
    else if (process.env.svDomain==="gldc"){
        token = '0a1d2e57-5b8a-4c17-a2a9-86d28025d123';
        appName = 'gldc';
    }
    if (flag===0){
        flag=1
        fetch('https://api.heroku.com/apps/' + appName + '/dynos/', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.heroku+json; version=3',
                'Authorization': 'Bearer ' + token
            }    })
            .then(res => {
                console.log("server restarted");
            })
            .catch(error => {
                console.log(error);
            });
    }

}
