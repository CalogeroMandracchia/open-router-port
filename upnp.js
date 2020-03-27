const natUpnp = require('nat-upnp');

const connection = natUpnp.createClient();

// { public: 12345, private: 12345, ttl: 60 }
const portMapping = data => new Promise((resolve, reject) => { 
    try {
        if(data.private == undefined) data.private = data.public;
        connection.portMapping(data, (error, portMapping) => {
            try {
                if(error) reject(error);
                resolve(portMapping);
            } catch(error) {
                reject(error);
            }
        });
    } catch(error) {
        throw error;
    }
});

// { local: true }
const getMappings = (data = {}) => new Promise((resolve, reject) => { 
    try {
        connection.getMappings(data, (error, getMappings) => {
            if(error) reject(error);
            resolve(getMappings);
        });
    } catch(error) {
        throw error;
    }
});

// { public: 12345}
const portUnmapping = (data = {}) => new Promise((resolve, reject) => { 
    try {
        connection.portUnmapping(data, (error, Unmapping) => {
            if(error) reject(error);
            resolve(Unmapping);
        });
    } catch(error) {
        throw error;
    }
});

const externalIp = () => new Promise((resolve, reject) => { 
    try {
        connection.externalIp((error, externalIp) => {
            if(error) reject(error);
            resolve(externalIp);
        });
    } catch(error) {
        throw error;
    }
});

const closeConnection = () => connection.close();

module.exports = {
    portMapping,
    getMappings,
    portUnmapping,
    externalIp,
    closeConnection
};
