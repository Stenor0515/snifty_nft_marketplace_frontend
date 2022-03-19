import React, { useState } from "react";

const TabComponent = () => {
  const [currentActive, setCurrentActive] = useState(0);
  const titles = ["History", "Info", "Insights", "Owners"];

  return (
    <div>
      <div className="flex justify-around mt-10 ">
        {titles.map((val, i) => (
          <div
            key={i}
            onClick={() => setCurrentActive(i)}
            className={`${
              i === currentActive
                ? "border-gray-600 font-bold "
                : "border-gray-400"
            }  cursor-pointer border-b  w-full text-center pb-2`}
          >
            {val}
          </div>
        ))}
      </div>
      <div className="px-4 py-4">
        {currentActive === 0 ? (
          <History />
        ) : currentActive === 1 ? (
          <Info />
        ) : currentActive === 2 ? (
          <Insights />
        ) : (
          <Owners />
        )}
      </div>
    </div>
  );
};

export default TabComponent;

const History = () => (
  <div className="">
    {[0, 1].map((val, i) => (
      <div key={i} className="mt-4">
        <div className="flex justify-between items-center text-xs">
          <div>
            <p className=" font-bold pb-2">SOLD</p>
            <p className=" font-serif">SNUGGLEPORN</p>
          </div>
          <div>
            <p className=" pb-2">A DAY AGO</p>
            <p>Ξ 0.08 / $256</p>
          </div>
        </div>
        <p className="text-xs mt-2">[view tx]</p>
      </div>
    ))}
  </div>
);

const Info = () => {
  const list = [
    "3500 X 3500 PX (IMAGE/JPEG) 6 MB",
    "ERC721 TOKEN STANDARD ",
    "VIEW METADATA",
    "VIEW MEDIA ON IPFS",
    "VERSION 3",
    "BUY NOW",
  ];
  return (
    <ul>
      {list.map((val, i) => (
        <li key={i} className="font-thin font-serif py-2 text-xs">
          {val}
        </li>
      ))}
    </ul>
  );
};

const Insights = () => {
  const list = [
    {
      title: "SOLD",
      desc: "1",
    },
    {
      title: "GIFTED",
      desc: "0",
    },
    {
      title: "AVG. SALE PRICE",
      desc: "Ξ 0.08",
    },
    {
      title: "TOTAL",
      desc: "Ξ 0.08",
    },
    {
      title: "OWNERS",
      desc: "1",
    },
    {
      title: "CREATED",
      desc: "FEB 9TH 2022",
    },
  ];
  return (
    <div>
      {list.map((val, i) => (
        <div key={i} className="flex items-center text-xs justify-between pb-4">
          <p className=" font-serif font-thin">{val.title}</p>
          <p className="font-medium">{val.desc}</p>
        </div>
      ))}
    </div>
  );
};

const Owners = () => {
  return (
    <div className="flex items-center text-xs justify-between">
      <div>
        <p className="font-bold mb-2">#1</p>
        <p className="font-thin font-serif">SNUGGLEPORN</p>
      </div>
      <div className="font-thin">
        <p className=" mb-2">A DAY AGO</p>
        <p>Ξ 0.08</p>
      </div>
    </div>
  );
};
