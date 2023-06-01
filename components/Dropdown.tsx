import React, { useState } from "react";

interface DropdownProps {
    options: string[];
    label: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, label }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const option = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptions([...selectedOptions, option]);
        } else {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        }
    };

    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <label>1{label}</label>

            <input
                type="text"
                placeholder="Search options"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            {filteredOptions.map((option, index) => (
                <div key={index}>
                    <input
                        type="checkbox"
                        id={option}
                        value={option}
                        checked={selectedOptions.includes(option)}
                        onChange={handleCheckboxClick}
                    />
                    <label htmlFor={option}>{option}</label>
                </div>
            ))}
            {selectedOptions.length > 0 && (
                <p>You selected: {selectedOptions.join(", ")}</p>
            )}
        </div>
    );
};

export default Dropdown;
