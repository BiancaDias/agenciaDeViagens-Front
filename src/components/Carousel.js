import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ContainerImages = styled.div`
  width: 700px;
  height: auto;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  button{
    background-color: #50c8c6;
      border: none;
      font-weight: 600;
      font-size: 30px;
      margin-right: 60px;
      cursor: pointer;
      width: 50px;
      height: 50px;
      border-radius: 15px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
      margin-top: 5px;
  }
`;

const ImageSlider = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Carousel = ({ images }) => {
  const anterior = "<";
  const proximo = ">";
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = currentIndex + 1 >= images.length ? 0 : currentIndex + 1;
      setCurrentIndex(nextIndex);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, images.length]);

  const handleNext = () => {
    const nextIndex = currentIndex + 1 >= images.length ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
  };

  return (
    <ContainerImages>
      <ImageSlider
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <Image src={image} alt={`Imagem ${index}`} key={index} />
        ))}
      </ImageSlider>
      <div>
        <button onClick={handlePrev}>{anterior}</button>
        <button onClick={handleNext}>{proximo}</button>'
      </div>
    </ContainerImages>
  );
};

export default Carousel;
