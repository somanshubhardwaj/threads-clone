import React from "react";
import DefaultLayout from "@/components/DefaultLayout";
const page = () => {
  
  return (
    <DefaultLayout>
      <div className="p-6">
        <div className="">
          <form className="flex gap-2">
            <input
              type="text"
              placeholder="Search for a user"
              className="p-2   rounded-lg flex-1"
            />
            <button className="bg-blue-500 text-white p-2 rounded-lg mt-2 w-max">
              Search
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default page;
