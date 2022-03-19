import { ButtonOutline } from "../../compnents/button";
const LatestDrops = () => {
  return (
    <section className="latest-drops">
      <div className="container text-white py-10 pb-60 md:pb-96 relative z-20">
        <h2 className=" text-4xl mb-4 md:text-7xl  font-light font-serif mt-14">
          This week's latest 🔥DROPS
        </h2>

        <ButtonOutline color="white">View Drops</ButtonOutline>
      </div>
    </section>
  );
};

export default LatestDrops;
