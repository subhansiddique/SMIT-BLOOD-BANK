import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useState } from "react";


import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../database/firebase.config";
import { useNavigate } from "react-router-dom";

function Find() {

    const [users, setUsers] = useState([]);
    const [savedValue, setSavedValue] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const list = [];
    const dbSnap = await getDocs(collection(db, "users"));
    dbSnap.forEach((item) => {
      list.push(item.data());
      setUsers(list);
    });
 
  };

  useEffect(() => {
    const value = localStorage.getItem("myKey");
    setSavedValue(value || "B+");
  }, []);
    return(
   <div>
    <Navbar />

    <div className="img">
        <h1 className="text-6xl text-white font-extrabold font-mono">
          FIND DONOR
        </h1>
        <Link
          to="/home"
          className=" text-white pt-10 px-3 py-2 rounded-md text-lg font-medium"
        >
          Home / Find donor
        </Link>
      </div>
    <h1 className="flex justify-center  pt-28 pb-28 w-[100vw] text-5xl underline-offset-4 text-gray-600 text-shadow: 28px 17px 6px rgba(0,0,0,0.6);">FIND DONORS</h1>

    <div className="rounded-lg  shadow-lg border flex justify-around flex-row flex-wrap w-[100vw]">
      
      {users.map((item) => (
        <div key={item.uid} onClick={()=>navigate(`/chat`  ,{state : item})} className="p-4 ">
          {/* <div className="userlist">
          
            <div>
              <h1>{item.name}</h1>
              <p>{item.email}</p>
          
              <p>Saved value: {savedValue}</p>
            </div>
          </div> */}
          <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-5">
      <div className="bg-red-500 text-white text-center py-4">
        <h2 className="text-xl uppercase font-bold">{item.name}</h2>
      </div>
      <div className="p-6">
        <p className="text-gray-700">
          <span className="font-semibold">Email: </span>{item.email}
        </p>
        <p className="text-gray-700 mt-2">
          <span className="font-semibold">Blood Group: </span>{savedValue}
        </p>
        <div className="mt-6">
          <button className="w-full bg-red-900 text-white font-bold py-2 px-4 rounded hover:bg-purple-600 transition duration-200">
            Request Info
          </button>
        </div>
      </div>
    </div>
         
   </div>
      ))}
    </div>
  <Footer />
   </div>
)
}
export default Find;