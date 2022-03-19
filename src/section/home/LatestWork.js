import React from "react";
import Image3 from "../../assets/images/card1.png";
import Image2 from "../../assets/images/card2.png";
import Image1 from "../../assets/images/card3.png";
import User from "../../assets/images/user.jpg";
import { NftCard } from "../../compnents";
import { ButtonOutline } from "../../compnents/button";
import { Link } from "react-router-dom";
const LatestWork = () => {
  return (
    <div className="section-space">
      <div className="container">
        <h4 className="font-serif text-3xl font-light">Latest Works</h4>
        <div className="grid  md:grid-cols-3 gap-8 mt-4">
          {cardList.map((v, i) => (
            <React.Fragment key={i}>
              <NftCard data={v} />
            </React.Fragment>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/marketplace">
            <ButtonOutline>View marketplace</ButtonOutline>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestWork;

const cardList = [
  {
    img: Image1,
    title: "Severance",
    userImage: User,
    userName: "DarkenemOOd",
    price: "0.7",
    list: "1/1",
  },
  {
    img: Image2,
    title: "Distorted Purity",
    userImage: User,
    userName: "myitchyfinger",
    price: "0.2",
    list: "1/1",
  },
  {
    img: Image3,
    title: "NEO SHARK",
    userImage: User,
    userName: "VAMORBO",
    price: "0.04",
    list: "1/10",
  },
];
