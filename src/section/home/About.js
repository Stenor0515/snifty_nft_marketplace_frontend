import React from "react";
import { ButtonOutline } from "../../compnents/button";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className=" bg-dark-400 py-40">
      <div className="container text-white">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className=" text-5xl font-serif ">
              Who are Snifty and what are NFTs?
            </h3>
          </div>
          <div>
            <p className=" font-light">
              Snifty (pronounced S-NFT) is the world's first, and largest, NFT
              Marketplace, built on the Binance Smart Chain Network. Allowing
              everyone to discover, collect, buy, and sell Digital Art NFTs.
            </p>
            <p className="font-light my-4 ">
              The Snifty NFT Marketplace is powered by the iNf4mation.com
              platform and gives artists a place to create unique, authentic,
              digital collectibles, in the form of NFTs. Blockchain technology
              makes this new approach to digital ownership possible.
            </p>
            <Link to="/marketplace">
              <ButtonOutline color="white">Explore Nfts</ButtonOutline>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
