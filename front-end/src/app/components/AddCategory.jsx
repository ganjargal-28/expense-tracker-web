import { IMAGES_MANIFEST } from "next/dist/shared/lib/constants";
import { useState } from "react";

const AddCategory = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/category", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });
      if (!response.ok) {
        throw new Error("failed");
      }

      setName("");
      setDescription("");

      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form>
        <div className="flex gap-6">
          <input
            type="text"
            placeholder="category  name "
            className="input input-bordered "
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="description"
            className="input input-bordered"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            add category
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
