const http = require('https');

const externalRequest = (req, res) =>{
    const url = "https://holidayapi.com/v1/holidays?key=4e98f2a5-a261-4538-a415-71948c2869d4&country=NG&year=2019&month=04&day=04&previous=true";

    http.get(url, {
        headers: {'Content-Type': 'application/json'}
    },(response)=>{
        let body = '';
        response
        .on('data', (chunk) =>{
            body += chunk.toString();
        })
        .on('end', ()=>{
            const parsed = JSON.parse(body);
            
            res.write(JSON.stringify(parsed));
            
            res.end();
        })
    })
};

module.exports = externalRequest;