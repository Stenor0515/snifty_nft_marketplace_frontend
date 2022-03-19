import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { ButtonOutline } from "../button";
import "./style.css";
import Logo from "../../assets/images/logo.png";
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Web3Modal from "web3modal";
import WalletConnectProvider from '@walletconnect/web3-provider';

const Header = () => {
  const [show, setShow] = useState(false);

  const [isConnected, setConnection] = useState(Boolean(localStorage.getItem("isConnected")));
  const [address, setAddress] = useState(isConnected && localStorage.getItem("public_address") ? localStorage.getItem("public_address") : "");

  const menuHandler = () => {
    setShow((prev) => !prev);
  };

  const providerOptions = {
    /* See Provider Options Section */
    metamask: {
      id: "injected",
      name: "MetaMask",
      type: "injected",
      check: "isMetaMask"
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "c920389f9ce94c71a540168206270f21",
        rpc: {
          56: "https://bsc-dataseed.binance.org/",
          97:"https://data-seed-prebsc-1-s1.binance.org:8545"
        },
        qrcodeModalOptions: {
          mobileLinks: [
            'rainbow',
            'metamask',
            'argent',
            'trust',
            'imtoken',
            'pillar',
          ],
        },
      },
      network: 'binance'
    }
  };
  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
  });

  const onConnect = async () => {
    const instance = await web3Modal.connect();
    if (!instance.selectedAddress) return;
    localStorage.setItem("isConnected", true);
    setConnection(true);

    // const web3 = new Web3(provider);
    // const accounts = await web3.eth.getAccounts();
    const public_address = instance.selectedAddress;
    localStorage.setItem("public_address", public_address);
    setAddress(public_address)
    // const networkId = await web3.eth.net.getId();

    // const chainId = await web3.eth.chainId();

    // await this.setState({
    //   web3,
    //   provider,
    //   connected: true,
    //   address,
    //   chainId,
    //   networkId
    // });
    // await this.getAccountAssets();
  };

  const onDisconnect = async () => {
    await web3Modal.clearCachedProvider();
    localStorage.setItem("isConnected", "");
    setConnection(false);
    localStorage.removeItem("public_address");
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


  return (
    <div className="z-30 bg-white shadow-md fixed w-full">
      <div className="container flex justify-between items-center">
        <Link to="/" className=" text-3xl font-light py-4 font-serif ">
          <img src={Logo} alt="" className="w-16 inline mr-4" />
          Snifty.io
        </Link>
        <div className="md:grid grid-flow-col justify-start items-center hidden ">
          {linkList.map((v, i) => (
            <Link to={v.link} key={i} className="block p-4 font-light text-2xl">
              {v.title}
            </Link>
          ))}
          {/* <button className=" bg-transparent border border-blue-500 text-blue-500 rounded-md  py-2 px-4 ml-4">
            Connect Wallet
          </button> */}
          {
            !isConnected ?

              <ButtonOutline onClick={onConnect}>Connect Wallet</ButtonOutline>
              :

              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    {address.slice(0, 6) + "..." + address.slice(-6)}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/profile"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Profile
                          </a>
                        )}
                      </Menu.Item>
                      <form method="POST" action="#">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={onDisconnect}
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block w-full text-left px-4 py-2 text-sm'
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </form>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
          }
        </div>
        <button className="text-2xl md:hidden" onClick={menuHandler}>
          <HiMenuAlt3 />
        </button>
        <div className={`mobile-menu ${show && "active"} md:hidden`}>
          {linkList.map((v, i) => (
            <Link
              to={v.link}
              key={i}
              className="block p-2 text-center py-3 font-light text-xl text-dark-600 "
            >
              {v.title}
            </Link>
          ))}
          <div className="py-2 text-center pb-4">
            {
              !isConnected ?

                <ButtonOutline onClick={onConnect}>Connect Wallet</ButtonOutline>
                :

                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                      {address.slice(0, 6) + "..." + address.slice(-6)}
                      <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="z-10 origin-top-right fixed mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/profile"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Profile
                            </a>
                          )}
                        </Menu.Item>
                        <form method="POST" action="#">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                type="button"
                                onClick={onDisconnect}
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block w-full text-left px-4 py-2 text-sm'
                                )}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </form>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

const linkList = [
  {
    title: "Marketplace",
    link: "/marketplace",
  },
  {
    title: "Auction",
    link: "/auction",
  },
];
