import React from 'react';

const TextWithLinks = ({ text, users }) => {
    const words = text.split(/(\s+)/); // Split on whitespace and preserve whitespaces

    const createLink = (word) => {
        if (word.startsWith('#')) {
            return (
                <a
                    href={`https://example.com/${word}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    {word}
                </a>
            );
        } else if (word.startsWith('@')) {
            const username = word.slice(1).replace(/[^a-zA-Z0-9_]/g, ''); // Remove non-alphanumeric characters
            const userExists = users.includes(username);

            if (userExists) {
                const punctuation = word.match(/[\W_]*$/)[0];
                return (
                    <React.Fragment>
                        <a
                            href={`https://example.com/${username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500"
                        >
                            {`@${username}`}
                        </a>
                        {punctuation}
                    </React.Fragment>
                );
            } else {
                return word;
            }
        } else {
            return word;
        }
    };

    return (
        <span>
            {words.map((word, index) => (
                <React.Fragment key={index}>
                    {createLink(word)}
                </React.Fragment>
            ))}
        </span>
    );
};

export default TextWithLinks;