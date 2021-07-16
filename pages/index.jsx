import React, { useState, useEffect } from "react";

import styles from "../styles/all.module.css";

const Home = () => {
    return (
        <div>
            <header>
                <h1>KiP - Write and save your notes on the decentralized web</h1>
            </header>

            <div className={styles.controls}>
                <input type="text" name="" placeholder="Title" id="" />
                <div>
                <textarea name="" id="" cols="50" rows="20">
                
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