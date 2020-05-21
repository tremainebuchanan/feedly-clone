const http = require('http');

const ping = (url, cb) => {
    http.get(url, (res) => {
        cb(null, res.statusCode);
    }).on('error', (e) => {
        cb(e, null);
    });
}

module.exports = ping;