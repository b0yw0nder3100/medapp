import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

interface DropdownProps {
    options: string[];
    label: string;
    selectedOptions: string[]
    setSelectedOptions: Dispatch<SetStateAction<string[]>>
}

const Dropdown: React.FC<DropdownProps> = ({ options, label, selectedOptions, setSelectedOptions }) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [showSearch, setShowSearch] = useState<boolean>(false)

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
            <label className="text-white text-[32px]">{label}</label>
            <div className="flex ">
                <div className="bg-white  p-[10px] w-[400px]">
                    <div className="border-[1px] pl-[10px] h-[40px] flex items-center cursor-pointer relative" onClick={() => setShowSearch(!showSearch)}>
                        {selectedOptions.length > 0 && (
                            <p>{selectedOptions.length < 3 ? selectedOptions.join(", ") : `${selectedOptions.length} selected`}</p>
                        )}
                        <div className="absolute top-[18px] right-[10px]">
                            <div className="w-[7px] h-[7px] m-auto relative">
                                <Image src="/assets/dropdown-arrow.png" layout="fill" alt="drop down" className="rotate-180" />
                            </div>
                        </div>
                    </div>

                    {showSearch && <div className="mt-[10px]">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full border-[1px] pl-[10px] h-[40px]"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <div className="h-[200px] overflow-y-scroll w-[380px] mt-[10px]">
                            {filteredOptions.map((option, index) => (
                                <div key={index}>
                                    <input
                                        type="checkbox"
                                        className="cursor-pointer"
                                        id={option}
                                        value={option}
                                        checked={selectedOptions.includes(option)}
                                        onChange={handleCheckboxClick}
                                    />
                                    <label htmlFor={option} className="ml-2 text-[20px]">{option}</label>
                                </div>
                            ))}
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
