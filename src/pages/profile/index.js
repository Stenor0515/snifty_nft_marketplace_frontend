/* eslint-disable no-unused-vars */
import React, { useState, Fragment, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useDropzone } from "react-dropzone";
import { Layout } from "../../compnents";
import "./style.css";
import UploadImage from "../../assets/images/upload.png";
import placeHolderUser from "../../assets/images/placeholderUser.png";
import { AiOutlineEye } from "react-icons/ai";
import { FiCopy } from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import TabComponent from "./component/TabComponent";
import EditForm from "./component/editForm";
import { Dialog, Transition } from '@headlessui/react'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import Web3Modal from 'web3modal'
import {iNf4NFT, iNf4NFTAddress} from '../../ABI/iNf4NFT';
import {NFTMarket, nftmarketaddress} from '../../ABI/NFTMarket';
import { ethers } from 'ethers'

const Profile = () => {
  const [coverImage, setCoverImage] = useState(false);
  const [profileImage, setProfileImage] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const hiddenFileInput = React.useRef(null);
  const [isConnected, setConnection] = useState(Boolean(localStorage.getItem("isConnected")));
  const [address, setAddress] = useState(isConnected ? localStorage.getItem("public_address") : "");
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();
  // formData
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' });

  const fileHandler = (event) => {
    hiddenFileInput.current.click();
  };

  const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

  async function uploadAsset(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log(url)
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function mint() {

    const { name, description, price } = formInput
    console.log(name, description, price, fileUrl)
    if (!name || !description || !price) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl, itemOwner: await window.ethereum.enable()
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function createSale(url) {
    console.log("createSale mint", iNf4NFTAddress, iNf4NFT)
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* next, create the item */
    let contract = new ethers.Contract(iNf4NFTAddress, iNf4NFT, signer)
    
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    console.log(tx);
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()
    const price = ethers.utils.parseUnits(formInput.price, 'ether')
    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, NFTMarket, signer)

    /* then list the item for sale on the marketplace */
    const listingFee = await contract.getListingFee()
    const listingPrice = (price * listingFee / 1000).toString();
    console.log(listingPrice)

    transaction = await contract.createMarketItem(iNf4NFTAddress, tokenId, price, { value: listingPrice })
    console.log(transaction)
    await transaction.wait()
    // eslint-disable-next-line no-restricted-globals
    navigate('/marketplace');
  }

  return (
    <Layout>
      <div>{coverImage ? <CoverImage /> : <DropZone />}</div>
      <div className="container lg:px-20 pb-20">
        <div className="flex  flex-col lg:flex-row justify-between">
          <div className=" max-w-max flex items-center flex-col justify-center -translate-y-1/3">
            <div className=" w-24 md:w-28 h-24 md:h-28 border-4 border-white outline outline-gray-300 mb-4  rounded-full overflow-hidden">
              <img
                src={
                  profileImage
                    ? "https://user-profile-images-cdn-bucket.storage.googleapis.com/0x0ef1b8e7564a7c0e6c52dff0b09ddc3954527d4c_avatar?ignoreCache=1644721340652"
                    : placeHolderUser
                }
                alt=""
              />
            </div>
            <div className="">
              <button
                onClick={fileHandler}
                className="text-xs border border-gray-300 p-2"
              >
                Upload cover image
              </button>
              <input
                type="file"
                className="hidden"
                ref={hiddenFileInput}
                name=""
                id=""
              />
            </div>
            <button
              className="text-xs mt-3 border border-gray-300  px-2 py-1.5"
              onClick={() => setEditProfile(true)}
            >
              Edit Profile
            </button>
          </div>
          <div className="flex flex-col lg:flex-row flex-1 justify-between lg:pl-16 pt-4">
            <div>
              <h1 className="text-4xl text-center  md:text-5xl font-light font-serif">
                {address.slice(0, 6) + "..." + address.slice(-6)}
              </h1>
              <div className="lg:grid grid-flow-col gap-1 mt-10 text-sm items-center justify-start hidden ">
                <span className="">
                  <AiOutlineEye />
                </span>
                <span>10</span>
              </div>
            </div>
            <div className="mt-10">
              <div className="flex items-center ">
                <img
                  src="https://www.logo.wine/a/logo/Binance/Binance-Icon-Logo.wine.svg"
                  alt=""
                  className="w-10"
                />
                <p className="flex items-center">
                  <span>{address.slice(0, 6) + "..." + address.slice(-6)}</span>
                  <CopyToClipboard
                    text={address}
                    onCopy={() =>
                      alert(
                        address + " Copied!"
                      )
                    }
                  >
                    <button className="text-xl  ml-1 text-gray-500">
                      <FiCopy />
                    </button>
                  </CopyToClipboard>
                </p>
              </div>
              <div>
                <button className="uppercase ml-4 lg:ml-0 text-gray-600 font-thin block text-xs mt-10">
                  Download History
                </button>
                <button className="mt-8 w-full lg:w-auto py-2 px-8 block border  border-gray-300 rounded-lg" onClick={() => setOpen(true)}>
                  Mint
                </button>

                <Transition.Root show={open} as={Fragment}>
                  <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                      </Transition.Child>

                      {/* This element is to trick the browser into centering the modal contents. */}
                      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                      </span>
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      >
                        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="">

                              <div>
                                <div className="md:grid">
                                  <div className="mt-5 md:mt-0">
                                    <form action="#" method="POST">
                                      <div className="shadow sm:rounded-md sm:overflow-hidden">
                                        <div className="px-6 py-5 bg-white space-y-6 sm:p-6">
                                          
                                          <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                              Name
                                            </label>
                                            <div className="mt-1">
                                              <input id="name" placeholder="Name" name="name" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" onChange={e => updateFormInput({ ...formInput, name: e.target.value })}/>
                                            </div>
                                          </div>

                                          <div>
                                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                              Price
                                            </label>
                                            <div className="mt-1">
                                              <input id="price" placeholder="Price" name="price" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" onChange={e => updateFormInput({ ...formInput, price: e.target.value })}/>
                                            </div>
                                          </div>

                                          <div>
                                            <label htmlFor="discription" className="block text-sm font-medium text-gray-700">
                                              Discription
                                            </label>
                                            <div className="mt-1">
                                              <textarea
                                                id="discription"
                                                name="discription"
                                                rows={3}
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                placeholder="Discription"
                                                defaultValue={''}
                                                onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                                              />
                                            </div>
                                          </div>

                                          <div>
                                            <label className="block text-sm font-medium text-gray-700">Image</label>
                                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                              <div className="space-y-1 text-center">
                                                <svg
                                                  className="mx-auto h-12 w-12 text-gray-400"
                                                  stroke="currentColor"
                                                  fill="none"
                                                  viewBox="0 0 48 48"
                                                  aria-hidden="true"
                                                >
                                                  <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                  <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                  >
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={uploadAsset}/>
                                                  </label>
                                                  <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                              </div>
                                            </div>
                                              {
                                                fileUrl && (
                                                  <img className="rounded mt-4" src={fileUrl} alt="uploaded" />
                                                )
                                              }
                                          </div>
                                        </div>
                                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                          <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={mint}
                                          >
                                            Mint
                                          </button>
                                          <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                              
                            </div>
                          </div>
                        </div>
                      </Transition.Child>
                    </div>
                  </Dialog>
                </Transition.Root>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-10">
          {editProfile ? <EditForm setEditProfile={setEditProfile} /> : <TabComponent />}
        </div>
      </div>

      <style>{"\
        textarea, input{\
          padding-top: 0.5rem;\
          padding-right: 0.75rem;\
          padding-bottom: 0.5rem;\
          padding-left: 0.75rem;\
        }\
      "}</style>
    </Layout>
  );
};

export default Profile;

function DropZone(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="dropzone-container bg-gray-100">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <span className="text-5xl text-center mx-auto flex justify-center text-gray-300">
          <img className="w-6 md:w-20 mb-2 md:mb-4" src={UploadImage} alt="" />
        </span>
        <p className="uppercase text-xs  md:text-base text-gray-400 md:font-bold">
          Upload Cover Image
        </p>
      </div>
      {/* <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside> */}
    </section>
  );
}

const CoverImage = () => {
  return (
    <div className="cover-image-container">
      <img
        src="https://storage.googleapis.com/user-profile-cover-images-cdn-bucket/0x0ef1b8e7564a7c0e6c52dff0b09ddc3954527d4c?time=1633347931083"
        alt=""
      />
    </div>
  );
};
