import React, { useState, useEffect } from "react";
import axios from 'axios'
import { ethers } from 'ethers'
import { Layout } from "../../compnents";
// import Image3 from "../../assets/images/card1.png";
// import Image2 from "../../assets/images/card2.png";
// import Image1 from "../../assets/images/card3.png";
// import Image4 from "../../assets/images/dolphin1.png";
// import Image5 from "../../assets/images/dolphin2.png";
// import Image6 from "../../assets/images/dolphin3.png";
// import Image7 from "../../assets/images/dolphin4.png";
// import Image8 from "../../assets/images/dolphin5.png";
// import Image9 from "../../assets/images/dolphin6.png";
// import Image10 from "../../assets/images/card4.png";
// import Image11 from "../../assets/images/card5.png";
// import Image12 from "../../assets/images/card6.png";
// import User from "../../assets/images/user.jpg";
import { NftCard } from "../../compnents";
import InfiniteScroll from "react-infinite-scroll-component";
import { BiSearchAlt2 } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";

import {NFTMarket, nftmarketaddress} from '../../ABI/NFTMarket';
import {iNf4NFT, iNf4NFTAddress} from '../../ABI/iNf4NFT';

const selectData1 = [
  {
    id: 1,
    name: "All",
  },
  {
    id: 2,
    name: "1 of 1",
  },
  {
    id: 3,
    name: "Rare 1/10",
  },
  {
    id: 4,
    name: "Offers Only",
  },
];
const selectData2 = [
  {
    id: 1,
    name: "Latest",
  },
  {
    id: 2,
    name: "Oldest",
  },
  {
    id: 3,
    name: "Lowest Price",
  },
  {
    id: 4,
    name: "Highest Price",
  },
  {
    id: 5,
    name: "Upcoming Sales",
  },
  {
    id: 6,
    name: "24h Reserve Auction",
  },
  {
    id: 7,
    name: "Genesis art",
  },
];

const MarketPlace = () => {
  const [select1, setSelect1] = useState("All");
  const [select2, setSelect2] = useState("Latest");
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {    
    const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545");
    const tokenContract = new ethers.Contract(iNf4NFTAddress, iNf4NFT, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, NFTMarket, provider)
    const data = await marketContract.fetchMarketItems()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        itemId: i.itemId,
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    console.log(items)
    setNfts(items)
    setLoadingState('loaded') 
  }

  return (
    <Layout>
      <div className="container">
        <div className="lg:px-14 ">
          <h1 className="text-5xl font-thin font-serif mt-20 ">Marketplace</h1>
          <p className="text-base mt-4 font-thin">
            Discover rare artworks by world class artists{" "}
          </p>
          <div className="flex flex-wrap items-center justify-between">
            <SearchBar />

            <div className="flex mt-4 ">
              <div>
                <CustomSelect
                  data={selectData1}
                  select={select1}
                  setSelect={setSelect1}
                />
              </div>
              <div className="ml-4">
                <CustomSelect
                  data={selectData2}
                  select={select2}
                  setSelect={setSelect2}
                />
              </div>
            </div>
          </div>
                  
          <InfiniteScroll
            dataLength={nfts.length}
            hasMore={nfts.length < 12}
            loader={<h4>Loading...</h4>}
            // endMessage={
              //   <p style={{ textAlign: "center" }}>
            //     <b>Yay! You have seen it all</b>
            //   </p>
            // }
            className="mt-10 md:mt-20 pb-20 grid md:grid-cols-3 gap-6 lg:gap-10"
            >
            {(loadingState === 'loaded' && !nfts.length)
            ? <div>
                <section className="explore-area">
                  <div className="container">
                    <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>
                  </div>
                </section>
              </div>
            : nfts.map((val, i) => (
                <React.Fragment key={i}>
                  <NftCard data={val} />
                </React.Fragment>
              ))
            }
          </InfiniteScroll>
        </div>
      </div>
    </Layout>
  );
};

export default MarketPlace;

const CustomSelect = ({ data, select, setSelect }) => {
  const [show, setShow] = useState(false);
  const selectHandler = () => {
    setShow((prev) => !prev);
  };

  const optionHandler = (val) => {
    console.log(val)
    // setShow(false);
    setSelect(val.name);
  };

  return (
    <button
      onClick={selectHandler}
      className="border relative w-32 border-gray-500 px-2  py-1 rounded-md flex items-center justify-between "
    >
      <span className="text-sm font-thin ">{select}</span>
      <span>
        <FiChevronDown />
      </span>
      <div
        className={`shadow-md z-50 absolute top-full left-0 bg-white border rounded-md border-gray-400 w-full py-0 ${
          show ? "" : " hidden "
        }`}
      >
        {data.map((val, i) => (
          <span
            className="text-xs hover:bg-gray-200 inline-block text-center w-full py-0.5"
            key={val.id}
            onClick={() => optionHandler(val)}
          >
            {val.name}
          </span>
        ))}
      </div>
    </button>
  );
};

const SearchBar = () => {
  return (
    <div className="border border-gray-400 w-full md:w-96 flex items-center rounded-md mt-2">
      <button className="p-2 text-xl text-gray-400">
        <BiSearchAlt2 />
      </button>
      <input type="text" className="focus:outline-none h-full w-full" />
    </div>
  );
};

// const cardList = [
//   {
//     img: Image1,
//     title: "Severance",
//     userImage: User,
//     userName: "DarkenemOOd",
//     price: "0.7",
//     list: "1/1",
//   },
//   {
//     img: Image2,
//     title: "Distorted Purity",
//     userImage: User,
//     userName: "myitchyfinger",
//     price: "0.2",
//     list: "1/1",
//   },
//   {
//     img: Image3,
//     title: "NEO SHARK",
//     userImage: User,
//     userName: "VAMORBO",
//     price: "0.04",
//     list: "1/10",
//   },
//   {
//     img: Image4,
//     title: "Severance",
//     userImage: User,
//     userName: "DarkenemOOd",
//     price: "0.7",
//     list: "1/1",
//   },
//   {
//     img: Image5,
//     title: "Distorted Purity",
//     userImage: User,
//     userName: "myitchyfinger",
//     price: "0.2",
//     list: "1/1",
//   },
//   {
//     img: Image6,
//     title: "NEO SHARK",
//     userImage: User,
//     userName: "VAMORBO",
//     price: "0.04",
//     list: "1/10",
//   },
//   {
//     img: Image7,
//     title: "Severance",
//     userImage: User,
//     userName: "DarkenemOOd",
//     price: "0.7",
//     list: "1/1",
//   },
//   {
//     img: Image8,
//     title: "Distorted Purity",
//     userImage: User,
//     userName: "myitchyfinger",
//     price: "0.2",
//     list: "1/1",
//   },
//   {
//     img: Image9,
//     title: "NEO SHARK",
//     userImage: User,
//     userName: "VAMORBO",
//     price: "0.04",
//     list: "1/10",
//   },
//   {
//     img: Image10,
//     title: "Severance",
//     userImage: User,
//     userName: "DarkenemOOd",
//     price: "0.7",
//     list: "1/1",
//   },
//   {
//     img: Image11,
//     title: "Distorted Purity",
//     userImage: User,
//     userName: "myitchyfinger",
//     price: "0.2",
//     list: "1/1",
//   },
//   {
//     img: Image12,
//     title: "NEO SHARK",
//     userImage: User,
//     userName: "VAMORBO",
//     price: "0.04",
//     list: "1/10",
//   },
// ];
