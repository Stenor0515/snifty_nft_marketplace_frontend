const Footer = () => {
  return (
    <div className=" bg-dark-600">
      <div className="container text-white pt-20 pb-40">
        <div className="grid  gap-y-10 md:gap-y-0 md:grid-cols-2">
          <div>
            <div>
              <h5 className="font-serif font-light text-2xl mt-2">
                Snifty{" "}
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
              </h5>
              <p className="font-light text-gray-400 mb-10">
                Discover and collect rare NFT art
              </p>
              <p className="font-bold text-lg">
                Stay in the picture, join our newsletter
              </p>
              <div className="bg-white mt-4 overflow-hidden max-w-fit rounded-lg">
                <input
                  type="text"
                  className="bg-transparent px-2 focus:outline-none text-dark-600"
                  placeholder="arts@snifty.io"
                />
                <button className=" text-dark-600 p-2 px-4 border-l border-dark-600 rounded-r-md">
                  Subscribe
                </button>
              </div>
              <p
                className="font-serif text-gray-400 text-xs mt-10"
                style={{ fontSize: "10px" }}
              >
                iNf4mation Ltd (Company Number: 227890)
              </p>
            </div>
          </div>
          <div>
            <div className="grid  gap-y-10 md:gap-y-0 md:grid-flow-col justify-start gap-x-36">
              <div>
                <h6 className="font-bold mb-2">Follow Us</h6>
                <ul>
                  {followList.map((val, i) => (
                    <li key={i}>
                      <a
                        href={val.link}
                        target={"_blank"}
                        className="font-light py-1.5 block"
                        rel="noreferrer"
                      >
                        {val.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h6 className="font-bold mb-2">Help</h6>
                <ul>
                  {helpList.map((val, i) => (
                    <li key={i}>
                      <a
                        href={val.link}
                        target={"_blank"}
                        className="font-light py-1.5 block"
                        rel="noreferrer"
                      >
                        {val.text}
                      </a>
                    </li>
                  ))}
                  {mailto.map((val, i) => (
                    <li key={i}>
                      <a
                        href={`mailto:${val.link}`}
                        className="font-light py-1.5 block"
                      >
                        {val.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

const followList = [
  {
    text: "Twitter",
    link: "https://twitter.com/nf4mation",
  },
  {
    text: "Facebook",
    link: "https://www.facebook.com/iNf4mation/",
  },
  {
    text: "Instagram",
    link: "https://www.instagram.com/iNf4mation.com_official",
  },
  {
    text: "BitCoinTalk",
    link: "https://bit.ly/33WY85I",
  },
  {
    text: "Blog",
    link: "https://news.inf4mation.com/",
  },
  {
    text: "Telegram",
    link: "http://t.me/iNf4mation_chat",
  },
  // {
  //   text: "Medium",
  //   link: "#",
  // },
  {
    text: "LinkedIn",
    link: "https://www.linkedin.com/company/inf4mation",
  },
];

const helpList = [
  {
    text: "Documentation / Press kit",
    link: "#",
  },
  {
    text: "Terms of Service",
    link: "https://inf4mation.com/ico/terms",
  },
  {
    text: "Privacy",
    link: "https://inf4mation.com/ico/privacy",
  },

  {
    text: "Support",
    link: "http://t.me/iNf4mation_chat",
  },
];

const mailto = [
  {
    text: "Report infringement",
    link: "report@snifty.io",
  },
  {
    text: "Partnership enquiry ",
    link: "partnerships@snifty.io",
  },
];
