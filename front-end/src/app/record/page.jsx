"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AddRecord from "../components/AddRecord";
import AddCategory from "../components/AddCategory";

const RecordsPage = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [records, setRecords] = useState([]);
  const refreshCategories = async () => {
    try {
      const response = await fetch("http://localhost:8000/category");
      if (!response.ok) {
        throw new Error("faild");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log("eroor", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/category");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchRecords = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await fetch(
          `http://localhost:8000/record?user_id=${userId}`
        );
        if (!response.ok) {
          throw  Error("Failed to fetch records");
        }
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchCategories();
    fetchRecords();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-center flex-col items-center gap-5">
        <header className="flex w-full py-4 justify-center bg-base-200">
          <div className="flex w-[55vw] justify-between items-center">
            <div className="flex gap-4 items-center">
              <div></div>
              <Link href="/dashboard">
                <div>Dashboard</div>
              </Link>
              <div>Records</div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
                className="btn btn-primary rounded-s-full rounded-e-full btn-sm"
              >
                Add Record
              </button>
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <AddRecord />
                </div>
              </dialog>
              <div className="avatar">
                <div className="w-14 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="w-[55vw] flex gap-5">
          {/* Left Sidebar */}
          <div className="card w-72 bg-base-200 border-[1px] h-screen border-base-300 py-5 px-3 gap-5">
            <div className="text-2xl font-semibold">Records</div>
            <div className="flex flex-col gap-4">
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button
                className="btn"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                add
              </button>
              <dialog id="my_modal_5" className="modal">
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
                {/* <AddRecord /> */}
              </dialog>

              <label className="input input-bordered flex items-center gap-2 h-8 min-h-8">
                <input
                  type="text"
                  className="grow"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>

            {/* Types */}
            <div className="flex flex-col gap-3">
              <div className="text-md font-semibold">Types</div>
              <div className="form-control flex flex-col ml-2">
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    className="radio radio-primary"
                    checked={selectedType === "all"}
                    onChange={() => setSelectedType("all")}
                  />
                  <span className="label-text ml-2">All</span>
                </label>
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    className="radio radio-primary"
                    checked={selectedType === "income"}
                    onChange={() => setSelectedType("income")}
                  />
                  <span className="label-text ml-2">Income</span>
                </label>
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    className="radio radio-primary"
                    checked={selectedType === "expense"}
                    onChange={() => setSelectedType("expense")}
                  />
                  <span className="label-text ml-2">Expense</span>
                </label>
              </div>
            </div>

            {/* Categories */}
            <div className="flex w-full justify-between items-center">
              <div className="text-md font-semibold">Category</div>
              <button
                className="text-base-content underline text-sm"
                onClick={() => setSelectedType("all")}
              >
                Clear
              </button>
            </div>
            <div className="flex carousel carousel-vertical flex-col gap-4">
              <div>
                <div className="form-control gap-6 flex flex-col ml-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center gap-3">
                      <img
                        src={category.category_icon}
                        alt=""
                        className="w-6 h-6"
                      />
                      <p>{category.name}</p>
                    </div>
                  ))}
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                </div>
              </div>
            </div>
            <div>
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button
                className="btn"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                add category
              </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Hello!</h3>
                  <AddCategory
                    onSuccess={() => {
                      refreshCategories();
                    }}
                  />
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-[75%] flex flex-col gap-5">
            <div className="w-full flex justify-between">
              <div className="flex items-center gap-3">
                <button className="btn btn-xs">
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <div>Last 30 days</div>
                <button className="btn btn-xs">
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
              <div className="dropdown">
                <button tabIndex={0} role="button" className="btn m-1">
                  Newest first
                  <i className="fa-solid fa-caret-down"></i>
                </button>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Item 2</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full flex flex-col gap-3 overflow-y-scroll h-[calc(100vh-250px)] scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-base-100">
              <div>Today</div>
              {records.map((record) => (
                <div
                  key={record.id}
                  className="card w-full bg-base-200 border-[1px] border-base-300 px-5 py-4 flex-row items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-house"></i>
                    <div>{record.name}</div>
                  </div>
                  <div>{record.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecordsPage;
