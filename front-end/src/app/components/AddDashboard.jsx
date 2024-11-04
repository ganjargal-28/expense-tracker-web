import { Form, useFormik } from "formik";
import {  useEffect, useState } from "react";

export const AddDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [current, setCurrent] = useState(1);
  const [userid, setUserid] = useState("");
  const [transactionType, setTransactionType] = useState("EXP");
  useEffect(() => {
    const userid = localStorage.getItem("userid");
    setUserid(userid);
  }, []);


  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:8000/transactions");
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);
  const formik = useFormik({
    initialValues:{
        
    }
  })
  return (
    <div className="max-w-md  mx-auto bg-white p-6 rounded-lg">
      {current === 1 ? (
        <form type="submit" className="space-y-4">
          <h1 className="text-xl font-bold mb-4 ">addrecord</h1>
          <div className="flex justify-between">
            <button
              className={`w-1/2 py-2 text-center font-semibold rounded-l-lg ${
                transactionType === "EXP"
                  ? "bg-info text-white"
                  : "bg-base-200 text-neutral-content"
              }`}
              onClick={() => setTransactionType("EXP")}
            >
              Expense
            </button>
            <button
              className={`w-1/2 text-center font-semibold rounded-l-lg ${
                transactionType === "INC"
                  ? "bg-info text-white"
                  : "bg-base-200 text-neutral-content"
              }`}
              onClick={() => setTransactionType("INC")}
            >
              Income
            </button>
          </div>
          <div>
            <label className=" block "> amount</label>
            <input type="number" placeholder="000" />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <label className="block"> date</label>
              <input type="date" />
            </div>
            <div>
              <label className="block"> time</label>
              <input type="time" />
            </div>
          </div>
          <div>
            <select name="cash" id=""></select>
          </div>
          <div className="flex flex-col">
            <label> payee</label>
            <input type="text" className="border border-gray-500" id="" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">note</label>
            <textarea
              name="write here"
              className=" border border-gray-400"
              id=""
            ></textarea>
            <button className="btn btn-primary">submit</button>
          </div>
        </form>
      ) : (
        <div>
          <h1>select</h1>
          <div>
            {categories.map((category) => {
              <button key={category.id}>
                <span>{category.name}</span>
              </button>;
            })}
          </div>
          <button>back</button>
        </div>
      )}
    </div>
  );
};
