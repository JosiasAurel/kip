import React from "react";

import Head from "next/head";

import styles from "../styles/all.module.css";

const server = "https://KiP.josiasaurel.repl.co";

const NotePage = ({ title, note }) => {
    console.log({title, note});
    return (
        <div>
            <Head>
                <link rel="icon" href="data:;base64,="></link>
            </Head>
            <main className={styles.notePage}>
                <article>
                <h2>{title}</h2>
                <p>
                    {note}
                </p>
            </article>
            </main>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const noteid = ctx.query.note;

    const noteReq = await fetch(`${server}/getnote`, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({noteid: noteid})
    });

    const noteData = await noteReq.json();

    return {
        props: noteData
    }
}

export default NotePage;