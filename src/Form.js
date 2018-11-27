import React from 'react';

const Form = ({ handleSubmit, inputText, handleChange }) => (
    <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            value={inputText} 
            onChange={handleChange}
        />
        <input 
            type="submit" 
            value="submit"
        />
    </form>
);


export default Form;