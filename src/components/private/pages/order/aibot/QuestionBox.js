import React, { useState } from 'react';

function QuestionBox({ onSubmit }) {
    const [question, setQuestion] = useState('who are you?');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(question);
        setQuestion('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask your question"
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default QuestionBox;
