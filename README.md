KiP

A small note taking app that saves notes to [ipfs](https://ipfs.io/) a decentralized interplanetary filesystem.

This was built as a way of trying out the technology.

Use it live [here](https://kip.vercel.app)

# Technologies

- Next.js
- Express
- ipfs

# Deploying

You can deploy the client on Vercel.

For the server, you can deploy it on [Repl.it](https://replit.com). Unfortunately, `ipfs` module has some issues with stopping the current activity after it has created or read a node. For this reason, the below server code will be required

```js
const express = require("express");
const { serialize, deserialize } = require("./util");

const IPFS = require("ipfs");
const cors = require("cors");

const app = express();

// enable JSON stuff
app.use(express.json());
app.use(cors());

app.post("/create/", async (req, res) => {
  const { title, note } = req.body;

  console.log(req.body);

  let note_ = {
    title: title,
    note: note,
  };

  async function doTheWork() {
    const node = await IPFS.create();

    let results = node.add(serialize(note_));

    let rData = await results;
    console.log(rData.path);

    res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.send({ id: rData.path });
    node.stop(() => console.log("Created data"));
    process.exit(1);
  }

  // execute everything
  await doTheWork();
});

app.post("/getnote/", async (req, res) => {
  const { noteid } = req.body;
  console.log(req.body);

  async function getNoteData() {
    const node = await IPFS.create();

    const stream = node.cat(noteid);
    let data = "";

    for await (const chunk of stream) {
      // chunks of data are returned as a Buffer, convert it back to a string
      data += chunk.toString();
    }

    console.log(data);

    res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.send(deserialize(data));

    node.stop(() => console.log("Sent data"));
    process.exit(1);
  }

  await getNoteData();
});

app.listen(4000, () => console.log("The decentralized web rocks"));
```

Also make sure to install `forever` for the server to restart after it has been killed to free up some space.
You `package.json` should be as below

```json
{
  "name": "kip-server",
  "version": "1.0.0",
  "description": "the server for KiP note app",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "forever start index.js"
  },
  "keywords": ["noteapp"],
  "author": "Josias Aurel",
  "license": "MIT",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "forever": "^4.0.1",
    "ipfs": "^0.55.4"
  },
  "devDependencies": {
    "nodemon": "^2.0.12"
  }
}
```

Nodemon will not work correctly on repl.it.
