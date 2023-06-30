import React, { useState } from "react";
// pages
import News from "./news";
import Events from "./events";

const tabs = [
  { id: 1, label: "News", page: "News" },
  { id: 2, label: "Events", page: "Events" },

];

const notice = () => {
  const [activeTab, setActiveTab] = useState("News");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div className="w-full px-2.5">
        <nav className="">
          <ul className="flex grid-cols-2">
            {tabs.map((tab) => (
              <li
                className="font-poppins text-xs text-gray-400 w-2/4 mx-2"
                key={tab.id}
              >
                <button
                  onClick={() => handleTabClick(tab.page)}
                  className={
                    activeTab === tab.page
                      ? "text-black bg-[#ebfaf2] px-4 py-3 rounded-lg font-bold w-full"
                      : "text-black bg-white px-4 py-3 rounded-lg font-bold w-full"
                  }
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {activeTab === "News" && <News />}
        {activeTab === "Events" && <Events />}
      </div>
     
    </>
  );
};

export default notice;