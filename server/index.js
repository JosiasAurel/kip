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

    console.log(req.body)

    let note_ = {
        title: title,
        note: note
    };

    async function doTheWork() {
        const node = await IPFS.create();

        let results = node.add(serialize(note_));

        let rData = await results;
        console.log(rData.path);

        res.send({id: rData.path});
        node.stop();
    }

    // execute everything
    await doTheWork();
});

app.post("/getnote/", async (req, res) => {
    const { noteid } = req.body;
    console.log(req.body)

    async function getNoteData() {
        const node = await IPFS.create()

        const stream = node.cat(noteid)
        let data = ''

        for await (const chunk of stream) {
            // chunks of data are returned as a Buffer, convert it back to a string
            data += chunk.toString()
        }

        console.log(data);

        res.send(deserialize(data));

        node.stop();
    }

    await getNoteData();
});

app.listen(4000, () => console.log("The decentralized web rocks"));