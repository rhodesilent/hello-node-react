const express = require('express');
const url = require('url');
const qryString = require('querystring');
var bodyParser = require('body-parser');

const _port = 4000;
// Basic how to start server
https://nodejs.org/en/docs/guides/getting-started-guide/

app = express();
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
    res.send('<h1>Hello world oye!</h1>')
});

// Return the get params by themselves
app.get('/loggetparams', (req, res) => {
    console.log(req.query);
    let keys = req.query
    let _res = ""
    for (var key in keys) {
        console.log(key + "=> " + req.query[key]);
    }
    console.log(req.param)
    res.send(req.params);
});

//host a post operation
https://stackoverflow.com/questions/5710358/how-to-access-post-form-fields
//https://stackoverflow.com/questions/10005939/how-do-i-consume-the-json-post-data-in-an-express-application
//Things have changed in v4 of Express

app.post('/post/logpostparams', (req, res) => {
    console.log(req.query);
    let keys = req.body
    for (var key in keys) {
        console.log(key + "=> " + req.body[key]);
    }
    /*
        To access individual "keys"... 
        console.log(req.body.key1);
    */
    let _res = ""
    res.send(req.body);
});

app.get('/getjson', (req, res)=>{
    res.json({ sayHello : "Hello from server!" });
});

//log json request
app.post('/logjson', (req, res) => {
    console.log(req.query);
    let keys = req.body //==> req.body
    for (var key in keys) {
        console.log(key + "=> " + req.body[key]);
    }
    /*
        To access individual "keys"... 
        console.log(req.body.key1);
    */
    let _res = ""
    res.send(req.body);
});

// return file from a "template" file (use pug template)
//https://expressjs.com/en/guide/using-template-engines.html
app.get("/pug-template", (req, res) => res.render('file1', {
    title: "Random title",
    message: "Random message"
}));

// Capture a specific header value
https://stackoverflow.com/questions/13147693/how-to-extract-request-http-headers-from-a-request-using-nodejs-connect
app.get("/all-headers", (req, res) => {
    console.log(JSON.stringify(req.headers));
    res.send(JSON.stringify(req.headers));
});

// Route a user to a different page?
app.get("/redirect", (req, res) => {
    return res.redirect('/redirected-page');
});

// Route a user to a different page?
app.get("/redirected-page", (req, res) => {
    return res.send('<h1> Welcome to redirected page</h1>');
});

// URL route patterns

// return a static html page
// https://stackoverflow.com/questions/37299108/node-js-serving-html-pages-and-static-content
/* app.use(express.static(__dirname + '/view'));
That will serve everything in your view directory
 if the name matches the URL, 
 e.g. http://yoursite.com/index.html will resolve to the file at __dirname + '/view/index.html' */






// Return a control which returns values dynamically


// Error page routing?
//https://expressjs.com/en/guide/error-handling.html

// MVC style code?

// Add a logger

// Return a basic react app
const path = require('path'); // Since we will be sending react files as "static" files
app.use(express.static(path.resolve(__dirname, "client/build")));
app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(_port, () => {
    console.log('Server has started pancho!');
});