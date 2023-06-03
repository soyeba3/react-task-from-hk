import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  sectors,
  subSectors,
  subSectors1,
  subSectors2,
} from "../components/formData";

const Home = () => {
  const [name, setName] = useState("");
  const [sectorName, setSectorName] = useState("");
  const [subSectorName, setSubSectorName] = useState("");
  const [subSector1Name, setSubSector1Name] = useState("");
  const [subSector2Name, setSubSector2Name] = useState("");
  const [userSector, setUserSector] = useState("");
  const [subSector, setSubSector] = useState([]);
  const [subSector1, setSubSector1] = useState([]);
  const [subSector2, setSubSector2] = useState([]);
  const [resData, setResData] = useState(null);

  // Catch Main Sector Name
  const handleSectorName = (e) => {
    setSectorName(e.target.value);
    setSubSectorName("");
    setSubSector1Name("");
    setSubSector2Name("");
  };

  // Catch Sub Sector Name
  const handleSubSectorName = (e) => {
    setSubSectorName(e.target.value);
    setSubSector1Name("");
  };

  // Catch Sub Sector 1 Name
  const handleSubSector1Name = (e) => {
    setSubSector1Name(e.target.value);
    setSubSector2Name("");
  };

  // Filter Sub Sector using sector id that already selected by user
  useEffect(() => {
    const filteredSubsectors = subSectors?.filter(
      (element) => element?.sectorId == sectorName?.split(",")[1]
    );
    setSubSector(filteredSubsectors);
  }, [sectorName]);

  // Filter Sub Sector 1 using sub sector id that already selected by user
  useEffect(() => {
    const filteredSubsectors1 = subSectors1?.filter((element) => {
      const id = subSectorName?.split(",")[1];
      return element?.subSectorId == id;
    });
    setSubSector1(filteredSubsectors1);
  }, [subSectorName]);

  // Filter Sub Sector 2 using sub sector 1 id that already selected by user
  useEffect(() => {
    const filteredSubsectors2 = subSectors2?.filter((element) => {
      const id = subSector1Name?.split(",")[1];
      return element?.subSector1Id == id;
    });
    setSubSector2(filteredSubsectors2);
  }, [subSector1Name]);

  // Finally catch the sector that user involved in
  useEffect(() => {
    if (subSector2Name) {
      setUserSector(subSector2Name);
    } else if (subSector1Name) {
      setUserSector(subSector1Name);
    } else if (subSectorName) {
      setUserSector(subSectorName);
    } else {
      setUserSector(sectorName);
    }
  }, [subSector2Name, subSector1Name, subSectorName, sectorName]);

  //User Data
  const userData = {
    name: name,
    sector: userSector,
    agree: true,
  };

  // Post and update Data to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (resData?._id) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/user/${resData?._id}`,
          userData
        );
        if (response.data) {
          toast.success("User Updated Successfully");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/add_user",
          userData
        );
        if (response.data) {
          toast.success("User Added Successfully");
        }
        setResData(response.data);
      } catch (error) {
        console.log("error");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-5">
      <div>
        <Link
          to="/users"
          className="w-full bg-cyan-600 text-white px-5 py-1 rounded-sm"
        >
          Users List
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-5/6 h-full sm:w-1/2 bg-cyan-100 p-[6%] flex flex-col gap-2 rounded-md"
      >
        <label className="text-xs">
          Please enter your name and pick the Sectors you are currently involved
          in.
        </label>
        <label>Name :</label>
        <input
          type="text"
          required
          onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setSubSector2Name(e.target.value)}
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
          {resData?._id ? "Update" : "Save"}
        </button>
      </form>
      <ToastContainer hideProgressBar autoClose={1000} />
    </div>
  );
};

export default Home;
