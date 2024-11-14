import React from "react";
import { FaSearch } from "react-icons/fa";
export default function Search() {
  return (
    <>
    <div className="height-[10vh]">
      <div className="px-6 py-4">
        <form action="">
          <div className="flex space-x-3">
          <label className="input input-bordered flex items-center gap-2 w-[80%]">
            <input type="text" className="grow" placeholder="Search" />
          </label>
          <button>
            <FaSearch className="text-2xl hover:bg-gray-700 rounded cursor-pointer"/>
          </button>
          </div>
        </form>
      </div>
      </div>
    </>
  );
}
