const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');
const dev = app.get('env') !== 'production'

if(!dev){
    app.disable('x-powered-by');
    app.use(compression());
}
//static serve
app.use(express.static(path.join(__dirname,'build')))

app.get('/*', (req,res,next) => {
    res.sendFile(path.join(__dirname,'build/index.html'))
})
app.listen(process.env.PORT || 8080, () => {
    console.log('server listening')
})