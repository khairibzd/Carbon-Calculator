
import { useState } from "react";
import associationImage from "./assets/Association.jpeg"; // Import the image
import greenImage from "./assets/green.png";
import sectionImage from "./assets/section.jpeg";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const gradientColors = {
  start: "#fa8bff",
  middle: "#2bd2ff",
  end: "#2bff88",
};

const fadeIn = keyframes`
  0% {
    transform: translateX(-10px);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const RelativeContainer = styled.div`
  background-color: ${gradientColors.start};
  background-image: linear-gradient(
    45deg,
    ${gradientColors.start} 0%,
    ${gradientColors.middle} 52%,
    ${gradientColors.end} 90%
  );
`;

const Image1 = styled.img`
  border-radius: 50%;
  margin-right: 15px;
`;

const Image2 = styled.img`
  border-radius: 50%;
`;

const ImagesContainer = styled.div`
  display: flex;
  margin-top: 15px;
`;

const SignupButton = styled.button`
  width: 120px;
  height: 55px;
  border-radius: 30px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  gap: 9px;
  color: white;
  background: linear-gradient(to right, rgb(128, 128, 255), rgb(183, 128, 255));
  position: relative;
  cursor: pointer;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.212);

  &:hover .arrow {
    animation: ${fadeIn} 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
`;

const Arrow = styled.span`
  position: absolute;
  right: 7.5px;
  background-color: white;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const SectionImage = styled.img`
  border-radius: 10%;
  height: 400px;
  width: 500px;
`;



const HomeComponent = () => {
  const [state, setState] = useState(false);

  const toggleState = () => {
    setState((prevState) => !prevState);
  };

  return (
    <>
      <RelativeContainer>
        <div className="relative h-screen">
          <div className="relative">
            <header>
              <nav
                className={`${
                  state
                    ? "absolute top-0 inset-x-0 bg-white shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-0 md:mt-0 md:relative md:bg-transparent"
                    : ""
                } pb-5 md:text-sm`}
              >
                <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                  <div className="flex items-center justify-between py-5 md:block">
                    <a href="#">
                      <ImagesContainer>
                        <Image1
                          className="image1"
                          src={associationImage}
                          width="100"
                          height="50"
                          alt="association"
                        />
                        <Image2
                          className="image2"
                          src={greenImage}
                          width="100"
                          height="50"
                          alt="association"
                        />
                      </ImagesContainer>
                    </a>
                  </div>
                  <div
                    className={`${
                      state ? "block" : "hidden"
                    } flex-1 items-center mt-8 md:mt-0 md:flex`}
                  >
                    <ul className="flex-1 justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                      {/* Add your navigation links here */}
                    </ul>
                    <div className="items-center justify-end mt-6 space-y-6 md:flex md:mt-0">
                      
                        <SignupButton className="signupBtn" onClick={toggleState}>
                          SIGN UP
                          <Arrow className="arrow">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 320 512"
                              fill="rgb(183, 128, 255)"
                            >
                              <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path>
                            </svg>
                          </Arrow>
                        </SignupButton>
                    </div>
                  </div>
                </div>
              </nav>
            </header>
            <section className="flex flex-col md:flex-row items-center justify-center">
              <div className="px-4 py-10 gap-24 text-gray-600 overflow-hidden md:px-24 md:flex">
                <div className="flex-none space-y-10 max-w-xl">
                  <h1 className="text-4xl text-gray-800 font-extrabold sm:text-5xl text-center md:text-left">
                    Calculate Your Carbon Footprint - Launching Soon!
                  </h1>
                  <p className="font-bold text-center md:text-left">
                    Explore your carbon footprint with our interactive
                    calculator and uncover strategies to reduce it effectively
                  </p>
                  <div className="flex items-center justify-center gap-x-3 sm:text-sm mt-4 md:justify-start">
                  <Link to="/section">
                    <a
                      href="#"
                      className="flex items-center justify-center gap-x-1 py-4 px-10 text-white font-medium bg-blue-700 duration-150 hover:bg-gray-400 active:bg-gray-900 rounded-full md:inline-flex"
                    >
                      Get started
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    </Link>

                  </div>
                </div>
                <div className="flex-1 mt-8 md:mt-0">
                  <SectionImage
                    src={sectionImage}
                    className="sectionImg mx-auto md:ml-0"
                    alt="Section"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </RelativeContainer>
    </>
  );
};



export default HomeComponent;