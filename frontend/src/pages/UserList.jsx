import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/allUsers"
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="m-4 flex flex-col justify-center items-center gap-3">
      <Link to="/" className="text-blue-400">
        Back to home page
      </Link>
      <h1>Entry List</h1>

      <table className="border-collapse w-[70%] ">
        <tr>
          <th className="py-3 text-center bg-cyan-600 text-white border-[1px] border-solid border-[#ddd]">
            Name
          </th>
          <th className="py-3 text-center bg-cyan-600 text-white border-[1px] border-solid border-[#ddd]">
            Sector
          </th>
        </tr>
        {data?.map((element) => {
          const sector = element?.sector.split(",")[0];
          return (
            <tr key={element?._id} className="even:bg-gray-100">
              <td className="border-[1px] border-solid border-[#ddd] px-4">
                {element?.name}
              </td>
              <td className="border-[1px] border-solid border-[#ddd] px-4">
                {sector}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default UserList;
