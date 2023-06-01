import Dropdown from "@/components/Search"
import symptoms from "@/data/symptoms"
import { useState } from "react";

export default function Home() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  console.log(selectedOptions)

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch('https://edocapi-adetokitimilehin.b4a.run/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedOptions)
      });

      if (response.ok) {
        // Handle successful response
        console.log('Post request successful');
      } else {
        // Handle error response
        console.error('Post request failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  return (
    <div className="hero flex justify-center items-center">
      <Dropdown options={symptoms} label="Select Symptoms" selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}></Dropdown>
      <button className="bg-blue-200 p-[10px] h-[60px] ml-[10px] mt-[50px]" onClick={handleSubmit}>Diagnose</button>
    </div>
  )
}
