import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
const options = { delay: 5000, stopOnMouseEnter: true, stopOnInteraction: false }; // Options
const autoplayRoot = (emblaRoot) => emblaRoot.parentElement; // Root node
const autoplay = Autoplay(options, autoplayRoot);

const media = [
  { title: "Ethereum hits new highs", subtitle: "Prices soared to more than $4,000 on wednesday.", src: "media1.jpg" },
  { title: "Building permits blocked", subtitle: "Sky rise permits in north Chicago were blocked by Gov. Newson.dsfsdfdsfsdfsdfsdfsdfsdfsdf", src: "media2.jpg" },
  { title: "Technology REST API", subtitle: "Get tech prices, news, and more.", src: "media3.jpg" },
];

const DotButton = ({ selected, onClick }) => (
  <button
    className={`embla__dot ${selected ? "is-selected" : ""}`}
    type="button"
    onClick={onClick}
  />
);

const PrevButton = ({ enabled, onClick }) => (
  <button
    className="embla__button embla__button--prev"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg className="embla__button__svg" viewBox="137.718 -1.001 366.563 644">
      <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
    </svg>
  </button>
);

const NextButton = ({ enabled, onClick }) => (
  <button
    className="embla__button embla__button--next"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg className="embla__button__svg" viewBox="0 0 238.003 238.003">
      <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
    </svg>
  </button>
);

const EmblaCarousel = ({ slides }) => {
  const [viewportRef, embla] = useEmblaCarousel(
    { skipSnaps: false, loop: true, speed: 10 },
    [autoplay]
  );
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  return (
    <>
      <div className="embla">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container">
            {media.map((slide, index) => (
              <div className="embla__slide" key={index}>
                 
                <div className="relative  overflow-hidden h-auto min-h-300 2xl:min-h-350 truncate">
                    <span className="z-40 absolute bottom-5 left-5 space-y-1 ">
                    <h1 className={"text-gray-300  font-semibold text-sm  uppercase"+(selectedIndex === index ? " animate-fade-in-right-fast " : "invisible")}>breaking news</h1>
                     <h1 className={"text-white text-xl font-medium truncate"+(selectedIndex === index ? " animate-fade-in-right " : "invisible")}>{slide.title}</h1>
                    <p className={"text-gray-50 truncate text-sm"+(selectedIndex === index ? " animate-fade-in-right-slow " : "invisible")}>{slide.subtitle}</p></span>
                  <img
                    className="embla__slide__img brightness-75  transition-all cursor-pointer"
                    src={slide.src}
                    alt="A cool cat."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </div>
    </>
  );
};

export default EmblaCarousel;
