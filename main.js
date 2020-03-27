`use strict`;
const http = require('http');
const upnp = require(`./upnp`);

const service = 'TEST';
const port = 12345;

const main = async () => {
    try {
        const server = http.createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`#3 IT WORKS! ${Date()}`);
        });
        server.listen(port, () => console.log(`#1 server is running at port ${port}`));

        const externalIP = await upnp.externalIp();
        await upnp.portMapping({ public: port, description: service });
        const mappings = await upnp.getMappings();
        mappings.filter(conn => conn.description.includes(service))[0].enabled == true ?
        console.log(`#2 service '${service}' is now online at ${externalIP}:${port} !!`) :
        console.log(`something went wrong`);
        upnp.closeConnection();

        //TEST
        http.request({ hostname: externalIP, port }, res => res.on('data', data => console.log(data.toString()))).end();
    } catch(error) {
        throw error;
    }
};

main();
