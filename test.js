
const IPFS = require("ipfs");

const main = async () => {
    const node = await IPFS.create()

    const stream = node.cat('QmUcYfaDR1GLYA9NjwdE1y3VSCE8qBMQQ85Cv8J3A2iKui')
let data = ''

for await (const chunk of stream) {
  // chunks of data are returned as a Buffer, convert it back to a string
  data += chunk.toString()
}

console.log(data)
}

main();