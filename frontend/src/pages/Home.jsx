import { useEffect, useState } from "react";
import {
  sectors,
  subSectors,
  subSectors1,
  subSectors2,
} from "../components/formData";

const Home = () => {
  const [sectorName, setSectorName] = useState("");
  const [subSectorName, setSubSectorName] = useState("");
  const [subSector1Name, setSubSector1Name] = useState("");
  const [subSector, setSubSector] = useState([]);
  const [subSector1, setSubSector1] = useState([]);
  const [subSector2, setSubSector2] = useState([]);

  const handleSectorName = (e) => {
    setSectorName(e.target.value);
    setSubSectorName("");
  };

  const handleSubSectorName = (e) => {
    setSubSectorName(e.target.value);
    setSubSector1Name("");
  };

  const handleSubSector1Name = (e) => {
    setSubSector1Name(e.target.value);
  };

  useEffect(() => {
    const filteredSubsectors = subSectors?.filter(
      (element) => element?.sectorId == sectorName?.split(",")[1]
    );
    setSubSector(filteredSubsectors);
  }, [sectorName]);

  useEffect(() => {
    const filteredSubsectors1 = subSectors1?.filter((element) => {
      const id = subSectorName?.split(",")[1];
      return element?.subSectorId == id;
    });
    setSubSector1(filteredSubsectors1);
  }, [subSectorName]);

  useEffect(() => {
    const filteredSubsectors2 = subSectors2?.filter((element) => {
      const id = subSector1Name?.split(",")[1];
      return element?.subSector1Id == id;
    });
    setSubSector2(filteredSubsectors2);
  }, [subSector1Name]);

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
          <option value="">Select</option>
          {sectors?.map((option) => (
            <option key={option.id} value={[option.value, option.id]}>
              {option.name}
            </option>
          ))}
        </select>
        {subSector.length > 0 && (
          <select
            required
            onChange={handleSubSectorName}
            className="text-sm py-1 border-solid border-2 border-cyan-200 outline-none"
          >
            <option value="">Select</option>
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
            onChange={handleSubSector1Name}
            className="text-sm py-1 border-solid border-2 border-cyan-200 outline-none"
          >
            <option value="">Select</option>
            {subSector1?.map((option) => (
              <option key={option.id} value={[option.value, option.id]}>
                {option.name}
              </option>
            ))}
          </select>
        )}
        {subSector2.length > 0 && (
          <select
            required
            className="text-sm py-1 border-solid border-2 border-cyan-200 outline-none"
          >
            <option value="">Select</option>
            {subSector2?.map((option) => (
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
