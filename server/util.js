
function serialize(data) {
    return JSON.stringify(data);
}

function deserialize(data) {
    return JSON.parse(data);
}

module.exports = { serialize, deserialize };