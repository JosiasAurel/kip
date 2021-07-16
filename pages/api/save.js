
const { serialize } = require("../../utils/serializers");
// import ipfs
const IPFS = require("ipfs");

module.exports = (req, res) => {
    if (req.method === "POST") {
        const { title, note } = req.body;
        console.log({title, note});

        const processIt = async () => {
        // create an IPFS node
    	const node = await IPFS.create();

            let newNote = {
                title: title,
                note: note
            };

            // let serialized = JSON.stringify({title, note}); // serialize(newNote);

            let results = await node.add(JSON.stringify({title: title, note: note}));

            console.log(results);
        }

        processIt();

        res.json({status: "Done"})
    }
}