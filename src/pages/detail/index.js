/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from "react";
import { Layout } from "../../compnents";
import { useNavigate } from 'react-router-dom';
import UserImage from "../../assets/images/user.jpg";
import { BsFillPatchCheckFill, BsFillShareFill, BsEye } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import Web3Modal from "web3modal";
import { AiOutlineDownload, AiOutlineHeart } from "react-icons/ai";
import detailsImage from "../../assets/images/detail.jpeg";
import Image3 from "../../assets/images/card1.png";
import Image2 from "../../assets/images/card2.png";
import Image1 from "../../assets/images/card3.png";
import axios from 'axios'
import User from "../../assets/images/user.jpg";
import TabComponent from "./components/TabComponent";
import NftCard from "../../compnents/nftcard";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  useParams
} from "react-router-dom";
import {ethers} from 'ethers';
import {NFTMarket, nftmarketaddress} from '../../ABI/NFTMarket';
import {iNf4NFT, iNf4NFTAddress} from '../../ABI/iNf4NFT';

const Details = () => {
  const {itemId} = useParams();
  const [item, setItem] = useState({image: ""});
  const navigate = useNavigate();
  useEffect(() => {
    loadNFTs()
  }, [])


  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545");
    const tokenContract = new ethers.Contract(iNf4NFTAddress, iNf4NFT, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, NFTMarket, provider)

    const marketItem = await marketContract.fetchMarketItem(itemId);
    const tokenUri = await tokenContract.tokenURI(marketItem.tokenId)
    const meta = await axios.get(tokenUri)

    setItem({
      itemId: marketItem.itemId,
      price: ethers.utils.formatUnits(marketItem.price.toString(), 'ether'),
      tokenId: marketItem.tokenId.toNumber(),
      seller: marketItem.seller,
      owner: marketItem.owner,
      image: meta.data.image,
      name: meta.data.name,
      description: meta.data.description,
    });
  }

  async function buy() {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, NFTMarket, signer)

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(item.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(iNf4NFTAddress, item.itemId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
    navigate('/marketplace');
  }
  return (
    <Layout>
      <div className="container py-10 text-dark-600">
        <div className="lg:px-10">
          <TopPart />
          <div className="grid md:grid-cols-12 mt-10 gap-x-12">
            {/* RIGHT */}
            <div className=" md:col-span-8">
              <LazyLoadImage src={item.image} effect="blur" className="w-full" />
              <div className="hidden md:block mt-40">
                {/* <h2 className="text-3xl font-serif font-thin ">
                  More by this artist
                </h2>
                <div className="md:grid   grid-cols-2 gap-8 hidden">
                  {data.map((val, i) => (
                    <React.Fragment key={i}>
                      <NftCard data={val} />
                    </React.Fragment>
                  ))}
                </div> */}
              </div>
            </div>
            {/* LEFT */}
            <div className=" md:col-span-4 mt-10 md:mt-0">
              <h1 className="text-4xl md:text-5xl font-serif font-thin leading-tight">
                {item.name}
              </h1>
              <div className="flex items-end  font-thin text-4xl mt-6">
                <span> {item.price} (BNB)</span>
                {/* <span className="text-base "> / $245</span> */}
              </div>
              <div>
                <button onClick={buy} className=" bg-blue-600 hover:bg-blue-500 py-3 w-full text-white  rounded-md text-xl mt-4">
                  Buy
                </button>
                <div>
                  <p className=" font-bold mt-8 mb-6">Description</p>
                  <p className="font-thin">
                    { item.description }
                  </p>

                  <div className="flex justify-between items-center mb-4 mt-8">
                    <div className=" text-2xl">
                      <BsFillShareFill />
                    </div>
                    <div className="grid grid-flow-col gap-x-3">
                      <div className="grid  grid-flow-col gap-x-2 items-center justify-start">
                        <span>
                          <BsEye />
                        </span>
                        <span>44</span>
                      </div>
                      <div className="grid  grid-flow-col gap-x-2 items-center justify-start">
                        <span>
                          <AiOutlineHeart />
                        </span>
                        <span>0</span>
                      </div>
                    </div>
                  </div>
                  <p className=" py-4 font-medium">Edition Details</p>
                  <div className="border border-dark-400 flex justify-around pad rounded-md py-5 px-2 text-center  ">
                    {editionDetails.map((val, i) => (
                      <div key={i}>
                        <p className=" font-thin text-xs mb-1">{val.title}</p>
                        <p className="font-bold">{val.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap  justify-start mt-10">
                    {taglist.map((val, i) => (
                      <a
                        href={val.link}
                        className=" bg-gray-400 m-1 rounded-md p-1 text-xs shadow-sm font-thin bg-opacity-25"
                        key={i}
                      >
                        #{val.text}
                      </a>
                    ))}
                  </div>
                  <TabComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Details;

const data = [
  {
    img: Image1,
    title: "Severance",
    userImage: User,
    userName: "DarkenemOOd",
    price: "0.7",
    list: "1/1",
  },
  {
    img: Image3,
    title: "Severance",
    userImage: User,
    userName: "DarkenemOOd",
    price: "0.7",
    list: "1/1",
  },
];

const editionDetails = [
  {
    title: "Edition #",
    desc: "#6964000",
  },
  {
    title: "EDITIONS",
    desc: "1 of 5",
  },
  {
    title: "AVAILABLE",
    desc: "4",
  },
];

const taglist = [
  {
    text: "2020",
    link: "#",
  },
  {
    text: "3d",
    link: "#",
  },
  {
    text: "3dart",
    link: "#",
  },
  {
    text: "3drender",
    link: "#",
  },
  {
    text: "abstract",
    link: "#",
  },
  {
    text: "caustic",
    link: "#",
  },
  {
    text: "hands",
    link: "#",
  },
  {
    text: "loveyourcollection",
    link: "#",
  },
  {
    text: "romance",
    link: "#",
  },
  {
    text: "sexy",
    link: "#",
  },
  {
    text: "art",
    link: "#",
  },
  {
    text: "cinema4d",
    link: "#",
  },
  {
    text: "psychedelic",
    link: "#",
  },
  {
    text: "beauty",
    link: "#",
  },
  {
    text: "rainbow",
    link: "#",
  },
  {
    text: "spectrum",
    link: "#",
  },
  {
    text: "love",
    link: "#",
  },
  {
    text: "digitalart",
    link: "#",
  },
];

const TopPart = () => {
  return (
    <div className="flex justify-start items-center  text-dark-600">
      <div className="rounded-full  overflow-hidden w-16 h-16">
        <img src={UserImage} className="w-full" alt="" />
      </div>
      <div className="ml-4">
        <p className="flex items-center text-3xl font-serif font-light">
          <span>FiveTimesNo</span>
          <span className="ml-1 text-xl text-blue-500">
            <BsFillPatchCheckFill />
          </span>
        </p>
        <p className="flex items-center text-xl font-serif font-thin">
          <span>
            <FaTwitter />
          </span>
          <span className="ml-1">@FiveTimesNo</span>
        </p>
      </div>
    </div>
  );
};
