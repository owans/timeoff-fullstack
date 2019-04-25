
const express = require('express');
const path = require('path');
const externalRequest = require('./middleware');
const port = process.env.PORT || 5000;

const app = express();

// Use express static
if (process.env.NODE_ENV !== "production") {
    app.use(express.static(path.join(__dirname, './build')));
} 

app.get('/request', (req, res) => {
    if (process.env.NODE_ENV !== "production") {
        res.sendFile(path.join(__dirname, './build/index.html'));
    } 
});

app.get('/holidays', externalRequest);

app.listen(port, (err) => {
    if(err){
        console.log(err)
    }else{
        console.info(`server is running on port: ${port}`);
    }
});
