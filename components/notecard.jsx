import React from "react";

const NoteCard = ({ title }) => {
    <div>
        <h2>
            { title }
        </h2>
        <span>
            <button>
                Read
            </button>
            <button>
                Share
            </button>
        </span>
    </div>
};

export default NoteCard;