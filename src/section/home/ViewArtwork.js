import { Link } from "react-router-dom";
import { ButtonOutline } from "../../compnents/button";
const ViewArtwork = () => {
  return (
    <div className="view-artwork">
      <div className="container text-white relative z-20 pt-20 pb-160 md:pb-80">
        <h2 className=" text-5xl md:text-7xl font-serif font-light">
          Cheryl Gurner <br />
          - Cold & Misty
        </h2>
        <Link to="/marketplace">
          <ButtonOutline color="white">View artworks</ButtonOutline>
        </Link>
      </div>
    </div>
  );
};

export default ViewArtwork;
