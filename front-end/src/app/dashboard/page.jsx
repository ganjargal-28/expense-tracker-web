"use client";

import React, { useState } from "react";

import Link from "next/link";
import { IncomeExpense } from "../components/IncomeExpense";
import { Barchart } from "../components/BarChart";

const DashBoardPage = () => {
  const [dashboard, setDashboard] = useState("")
  return (
    <div className="w-full bg-gray-300">
      <div className="container mx-auto bg-[#ffff]">
        <div className="flex justify-center flex-col items-center bg-base-200 gap-5 ">
          <header className="flex w-full py-4 justify-center bg-base-100">
            <div className="flex w-[55vw] justify-between items-center">
              <div className="flex gap-4 items-center">
                <div></div>
                <div>Dashboard</div>
                <Link href="/record">
                  <div>Records</div>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <button className="btn btn-primary rounded-s-full rounded-e-full btn-sm">
                  Add Record
                </button>
                <div className="avatar">
                  <div className="w-14 rounded-full">
                    <img
                      className="rounded-full"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main className="flex flex-col gap-5 bg-base-200 mt-4 pb-[70px]">
            <div className="flex gap-5">
              {/* Cash Card */}
              <div className="card bg-blue-500 text-white w-[18vw] rounded-lg  p-5">
                <div className="flex flex-col">
                  <div className="text-lg font-bold">Geld</div>
                  <div className="text-sm mt-2">Cash</div>
                  <div className="text-4xl font-semibold mt-4">10,000,00</div>
                </div>
              </div>

              {/* Income Card */}
              <div className="card bg-base-100 w-[18vw] rounded-box p-5">
                <div className="text-lg flex items-center gap-4 font-semibold text-green-500">
                  <img src="/green.png" alt="" />
                  Your Income
                </div>
                <div className="text-3xl font-bold mt-2">1,200,000 ₹</div>
                <div className="text-sm text-gray-400">Your Income Amount</div>
                <div className="flex items-center mt-2 text-green-500">
                  <img src="/up.png" alt="" />
                  <span className="ml-1">32% from last month</span>
                </div>
              </div>

              {/* Expenses Card */}
              <div className="card bg-base-100 w-[18vw] rounded-box p-5">
                <div className="text-lg flex items-center gap-4 font-semibold text-blue-500">
                  <img src="/blue.png" alt="" />
                  Total Expenses
                </div>
                <div className="text-3xl font-bold mt-2">-1,200,000 ₹</div>
                <div className="text-sm text-gray-400">Your Expense Amount</div>
                <div className="flex items-center mt-2 text-blue-500">
                  <img src="/down.png" alt="" />
                  <span className="ml-1">32% from last month</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_1fr] gap-6">
              <div className=" w-full h-full">
                <Barchart />
              </div>
              <div className="w-full h-full">
                <IncomeExpense />
              </div>
            </div>

            <div className="card bg-base-300 carousel carousel-vertical w-full rounded-box p-5">
              <div className="text-lg font-semibold mb-4">Last Records</div>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b py-2">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-500 text-white p-2 rounded-full">
                      <span className="material-icons text-2xl">home</span>
                    </div>

                    <div>
                      <div className="text-md font-semibold">
                        Lending & Renting
                      </div>
                      <div className="text-sm text-gray-400">3 hours ago</div>
                    </div>
                  </div>

                  <div className="text-green-500 font-semibold">- 1,000 ₹</div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
