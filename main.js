`use strict`;
const http = require('http');
const upnp = require(`./upnp`);

const service = 'TEST';
const port = 12345;

const server = http.createServer((req, res) => {
    console.log(`client connected`);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(Date() + `-TEST`.repeat(1000));
});
server.listen(port, () => console.log(`server is running at port ${port}`));

const main = async () => {
    try {
        const externalIP = await upnp.externalIp();
        await upnp.portMapping({ public: port, description: service });
        const mappings = await upnp.getMappings();
        mappings.filter(conn => conn.description.includes(service))[0].enabled == true ?
        console.log(`service '${service}' is now online at ${externalIP}:${port} !!`) :
        console.log(`something went wrong`);
        upnp.closeConnection();
    } catch(error) {
        throw error;
    }
};

main();
