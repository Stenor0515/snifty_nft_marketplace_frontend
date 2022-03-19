import React from "react";
import { ButtonOutline } from "../../compnents/button";

const JoinCommunity = () => {
  return (
    <div className="bg-white">
      <div className="container text-dark-600 py-40">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className=" text-4xl md:text-5xl font-serif ">
              Join our community<br />
              <p className="inline text-sm">
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
              Meet the Snifty team, artists and collectors for platform updates,
              announcements, and more...
            </p>

            <ButtonOutline color="dark">Launch discord</ButtonOutline>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinCommunity;
