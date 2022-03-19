import React from "react";
import { Layout } from "../../compnents";
import {
  Banner,
  LatestWork,
  LatestDrops,
  UpcomingSales,
  ViewArtwork,
  ReserveAuction,
  About,
  EmbeddedNfts,
  BecomeArtist,
  JoinCommunity,
} from "../../section/home";
const Home = () => {
  return (
    <Layout>
      <Banner />
      <LatestWork />
      <LatestDrops />
      <UpcomingSales />
      <ViewArtwork />
      <ReserveAuction />
      <About />
      {/* <EmbeddedNfts /> */}
      <BecomeArtist />
      <JoinCommunity />
    </Layout>
  );
};

export default Home;
