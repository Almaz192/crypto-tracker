import React from "react";
import "./Input.css";

function Input({ value, onChange, placeholder }) {
    return (
        <div className="input-wrapper">
            <input
                type="text"
                className="input"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}

export default Input;
