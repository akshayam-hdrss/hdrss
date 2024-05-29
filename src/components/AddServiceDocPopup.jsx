import React from "react";

function AddServiceDocPopup({ hidden, setHidden }) {
  return (
    <div className={`p-3 pt-10 ${hidden ? "hidden" : " "}`}>
      <form action="submit">
        <div className="flex flex-col justify-between items-start">
          <p className="text-xl font-medium mb-1">Name</p>
          <input
            type="text"
            placeholder="Name"
            className="border border-kaavi pl-4 py-3 mb-6"
          />
          <p className="text-xl font-medium mb-1">Position</p>
          <input
            type="text"
            placeholder="position"
            className="border border-kaavi pl-4 py-3 mb-6"
          />
          <p className="text-xl font-medium mb-1">Mobile Number</p>
          <input
            type="number"
            placeholder="Mobile Number"
            className="border border-kaavi pl-4 py-3 mb-6"
          />
          <p className="text-xl font-medium mb-1">About</p>
          <textarea
            name="about"
            id="about"
            className="border border-kaavi pl-4 py-3 mb-6"
          ></textarea>
          <p className="text-xl font-medium mb-1">Photos</p>
          <input
            type="file"
            placeholder="photos"
            className="border border-kaavi mb-6 w-60 "
          />
          <p className="text-xl font-medium mb-1">Location</p>
          <input
            type="text"
            placeholder="location"
            className="border border-kaavi pl-4 py-3 mb-6"
          />
          <div className="flex justify-between">
            <button className="border border-black mr-2 p-2 px-14">
              Cancel
            </button>
            <button className="text-white bg-kaavi p-2 px-14">Add</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddServiceDocPopup;
