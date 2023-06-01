import { useEffect, useState } from "react";
import { selectors, subSelectors, subSelectors1 } from "../components/formData";

const Home = () => {
  const [sectorName, setSectorName] = useState("");
  const [subSectorName, setSubSectorName] = useState("");
  const [subSector, setSubSector] = useState([]);
  const [subSector1, setSubSector1] = useState([]);

  const handleSectorName = (e) => {
    setSectorName(e.target.value);
    setSubSectorName("");
  };

  // console.log(sectorName, subSector);
  // console.log(subSectorName, subSector1);

  useEffect(() => {
    const filteredSubsectors = subSelectors?.filter(
      (element) => element?.sectorId == sectorName?.split(",")[1]
    );
    setSubSector(filteredSubsectors);
  }, [sectorName]);

  useEffect(() => {
    const filteredSubsectors1 = subSelectors1?.filter((element) => {
      console.log(subSectorName?.split(",")[1]);
      return element?.subSelectorsId === subSectorName?.split(",")[1];
    });

    setSubSector1(filteredSubsectors1);
  }, [subSectorName]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form className="w-5/6 h-full sm:w-1/2 bg-cyan-100 p-[6%] flex flex-col gap-2 rounded-md">
        <label className="text-xs">
          Please enter your name and pick the Sectors you are currently involved
          in.
        </label>
        <label>Name :</label>
        <input
          type="text"
          required
          placeholder="Enter your name"
          className="border-solid border-2 border-cyan-200 w-full inline-block px-2 py-1 outline-none"
        />
        <label>Sectors :</label>
        <select
          required
          onChange={handleSectorName}
          className="text-sm py-1 border-solid border-2 border-cyan-200 outline-none"
        >
          {" "}
          <option>Select</option>
          {selectors?.map((option) => (
            <option key={option.id} value={[option.value, option.id]}>
              {option.name}
            </option>
          ))}
        </select>
        {subSector.length > 0 && (
          <select
            required
            onChange={(e) => setSubSectorName(e.target.value)}
            className="text-sm py-1 border-solid border-2 border-cyan-200 outline-none"
          >
            <option disabled>Select</option>
            {subSector?.map((option) => (
              <option key={option.id} value={[option.value, option.id]}>
                {option.name}
              </option>
            ))}
          </select>
        )}
        {subSector1.length > 0 && (
          <select
            required
            className="text-sm py-1 border-solid border-2 border-cyan-200 outline-none"
          >
            <option disabled>Select</option>
            {subSector1?.map((option) => (
              <option key={option.id} value={[option.value, option.id]}>
                {option.name}
              </option>
            ))}
          </select>
        )}
        <label>
          <input required type="checkbox" name="" id="" /> Agree to terms
        </label>
        <button type="submit" className="w-full bg-cyan-600 text-white py-1">
          Save
        </button>
      </form>
    </div>
  );
};

export default Home;
