import React, { useState, useEffect } from "react";

import styles from "../styles/all.module.css";

// import utils
// import { serialize, deserialize } from "../utils/serializers";

import Head from "next/head";

// server URL
const server = "https://KiP.josiasaurel.repl.co";

const Home = () => {
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [fetchedNotes, setFetchedNotes] = useState([]);
    
    // text change handler
    function textChangehandler(event, handler) {
        handler(event.target.value);
    }

    useEffect(() => {
        setFetchedNotes(JSON.parse(localStorage.getItem("notes")) || []);
    }, []);

    // save note handler
    async function saveNote() {
        fetch(`${server}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title, note})
        }).then(res => res.json()).then(notecid => {
            if (localStorage.getItem("notes")) {
                let prevNotes = JSON.parse(localStorage.getItem("notes"));

                prevNotes.push(notecid.id);
                console.log(notecid);

                alert(`Here is the node id. You can share it ${notecid.id}`);

                setFetchedNotes([...fetchedNotes, notecid.id])

                localStorage.setItem("notes", JSON.stringify(prevNotes));

            } else {
                localStorage.setItem("notes", JSON.stringify([notecid.id]));
            }

            // reload page
            window.location.href = location.href;

        });
    }
    return (
        <div>
            <Head>
                <link rel="icon" href="data:;base64,="></link>
            </Head>
            <header className={styles.header}>
                <h1>KiP <br /> Write and save your notes on the decentralized web</h1>
            </header>

            <div className={styles.controls}>
                <input value={title} onChange={e => textChangehandler(e, setTitle)} type="text" name="" placeholder="Title" id="" />
                <div>
                <textarea value={note} onChange={e => textChangehandler(e, setNote)} name="" id="" cols="50" rows="20">
                
                </textarea>
            </div>
            <span>
                <button onClick={ e => saveNote()}>
                    Save
                </button>
            </span>
            </div>

            <div className={styles.notes}>
                {fetchedNotes === [] ?
                <h2>You have no saved notes, yet!</h2>
                : 
                <div className={styles.notes}>
                    { fetchedNotes.map(note => {
                    return (
                        <div className={styles.inote} key={note}>
                            <p>{note}</p>
                            <a href={`/${note}`}>Share</a>
                        </div>
                    )
                        }) 
                    }
                </div>
                }
            </div>
        </div>
    )
}

export default Home;