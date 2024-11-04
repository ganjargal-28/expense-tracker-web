"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";

const AddRecord = () => {
  const [transactionType, setTransactionType] = useState("EXP");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [categories, setCategories] = useState([]); // Step 1: Form, Step 2: Category
  const [userId, setUserId] = useState("");
  const today = format(new Date(), "yyyy-MM-dd");
  const now = format(new Date(), "HH:mm");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:8000/category");
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);
  const formik = useFormik({
    initialValues: {
      amount: "",
      date: today,
      time: now,
      category_id: "",
      payee: "",
      note: "",
    },
    validationSchema: Yup.object({
      amount: Yup.number().required("Amount is required"),
      date: Yup.string().required("Date is required"),
      time: Yup.string().required("Time is required"),
      payee: Yup.string().required("Payee is required"),
      note: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        const record = {
          ...values,
          type: transactionType,
          amount: Number(values.amount),
          createdAt: new Date().toISOString(),
          user_id: userId,
        };

        const response = await fetch("http://localhost:8000/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(record),
        });

        if (!response.ok) {
          const data = await response.json();
          alert(`error: ${data.message}`);
        }

        document.getElementById("my_modal_3").close();
        alert("Record added successfully!");
        formik.resetForm();
        setCurrentStep(1);
      } catch (error) {
        console.error("Error adding record:", error);
        console.log(`error is${error}`);
        alert("Failed to add record. Please try again." + error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleCategorySelect = (categoryName) => {
    formik.setFieldValue("category", categoryName);
    formik.submitForm(); // Submit the form after category selection
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg">
      {currentStep === 1 ? (
        // Step 1: Main Form
        <form type="submit" className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Add Record</h2>

          <div className="flex justify-between mb-4">
            <button
              type="button"
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
              type="button"
              className={`w-1/2 py-2 text-center font-semibold rounded-r-lg ${
                transactionType === "INC"
                  ? "bg-success text-white"
                  : "bg-base-200 text-neutral-content"
              }`}
              onClick={() => setTransactionType("INC")}
            >
              Income
            </button>
          </div>

          <div>
            <label className="block">Amount</label>
            <input
              type="number"
              placeholder="₮ 000"
              className={`input input-bordered w-full ${
                formik.touched.amount && formik.errors.amount
                  ? "input-error"
                  : ""
              }`}
              {...formik.getFieldProps("amount")}
            />
          </div>

          <div className="flex justify-between gap-4">
            <div className="w-1/2">
              <label className="block">Date</label>
              <input
                type="date"
                className="input input-bordered w-full"
                {...formik.getFieldProps("date")}
              />
            </div>
            <div className="w-1/2">
              <label className="block">Time</label>
              <input
                type="time"
                className="input input-bordered w-full"
                {...formik.getFieldProps("time")}
              />
            </div>
          </div>
          <div>
            <select
              name="category_id"
              className="select select-primary w-full max-w-xs"
              value={formik.values.category_id}
              onChange={formik.handleChange}
            >
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block">Payee</label>
            <input
              type="text"
              placeholder="Write here"
              className="input input-bordered w-full"
              {...formik.getFieldProps("payee")}
            />
          </div>

          <div>
            <label className="block">Note</label>
            <textarea
              placeholder="Write here"
              className="textarea textarea-bordered w-full"
              rows="3"
              {...formik.getFieldProps("note")}
            />
          </div>

          <button
            type="submit"
            onClick={formik.handleSubmit}
            className="w-full btn btn-primary"
          >
            submit
          </button>
        </form>
      ) : (
        // Step 2: Category Selection
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Select Category</h2>
          <div className="grid grid-cols-3 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.name)}
                className="p-4 border rounded-lg hover:bg-base-200 flex flex-col items-center gap-2"
              >
                <img src={category.icon} alt="" className="w-8 h-8" />
                <span className="text-sm text-center">{category.name}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className="w-full btn btn-outline mt-4"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default AddRecord;
