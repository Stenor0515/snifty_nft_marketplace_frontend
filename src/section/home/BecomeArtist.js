import React from "react";
import { ButtonOutline } from "../../compnents/button";
const BecomeArtist = () => {
  return (
    <div className="bg-dark-500">
      <div className="container text-white py-20 md:py-40">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className=" text-4xl md:text-5xl font-serif ">
              Become an artist on Snifty{" "}
              <p className="inline text-sm">
              {" "}
              (powered by{" "}
              <a
                href="https://inf4mation.com/"
                target={"_blank"}
                rel="noreferrer"
              >
                iNf4mation.com
              </a>
              )
            </p>
            </h3>
          </div>
          <div>
            <p className=" font-light mb-4">
              Join our community of creatives, showcase and sell your digital
              artworks. Digitally sign your work by creating a tokenized
              certificate.
            </p>

            <ButtonOutline color="white">Apply to join</ButtonOutline>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeArtist;
