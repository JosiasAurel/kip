import React from "react";

const server = "http://localhost:4000";

const NotePage = () => {
    return (
        <div>
            <h2>Data</h2>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const cid = ctx.query.node;

    const fetchRes = await fetch(`${server}/getnote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({noteid: cid})
    });

    const dataRes = await fetchRes.json();

    console.log(dataRes);
    return {
        props: { dataRes }
    }
} 

export default NotePage;