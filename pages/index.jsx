import React, { useState, useEffect } from "react";

import styles from "../styles/all.module.css";

// import utils
import { serialize, deserialize } from "../utils/serializers";

// import ipfs

const Home = () => {
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    
    // text change handler
    function textChangehandler(event, handler) {
        handler(event.target.value);
    }

    // save note handler
    function saveNote() {
        let newNote = {
            title: title,
            note: note
        };

        let serialized = serialize(newNote);
    }
    return (
        <div>
            <header>
                <h1>KiP - Write and save your notes on the decentralized web</h1>
            </header>

            <div className={styles.controls}>
                <input value={title} onChange={e => textChangehandler(e, setTitle)} type="text" name="" placeholder="Title" id="" />
                <div>
                <textarea value={note} onChange={e => textChangehandler(e, setNote)} name="" id="" cols="50" rows="20">
                
                </textarea>
            </div>
            <span>
                <button>
                    Save
                </button>
            </span>
            </div>
        </div>
    )
}

export default Home;