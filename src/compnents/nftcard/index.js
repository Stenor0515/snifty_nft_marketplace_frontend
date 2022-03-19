import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
const NftCard = ({ data }) => {
  return (
    <div className=" shadow-2xl">
      <Link to={"/details/" + data.itemId} className=" w-full card-img-wrapper">
        <LazyLoadImage effect="blur" src={data.image} className="w-full" />
      </Link>

      <div className="p-4">
        <div className="bg-white flex items-center justify-between text-black ">
          <p className="font-light">{data.name}</p>
          <p className="text-xs font-bold">{data.description}</p>
        </div>
        {/* <div className="mt-4 grid grid-flow-col justify-start items-center gap-x-2">
          <div className="w-8 h-8 overflow-hidden rounded-full ">
            <img src={data.userImage} alt="" />
          </div>
          <p className="font-light text-base font-serif">{data.userName}</p>
        </div> */}
      </div>
      <div className="p-4 card-btm font-medium">
        <p>Price</p>
        <p>Ξ {data.price}</p>
      </div>
    </div>
  );
};

export default NftCard;
