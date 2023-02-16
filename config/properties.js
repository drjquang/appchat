var ip = require("ip");
const hostname = ip.address()
const port = 3000

module.exports = {
    hostname: hostname,
    port: port
};