import { useState, useEffect, useRef } from "react";
import img1 from "/krem.webp";
import img2 from "/vaj.webp";
import img3 from "/naturalskincare.jpg";
import img4 from "/shampo.jpg";
import img5 from "/men-skin-care.jpg";
import img6 from "/care products.jpg";

export default function AutoplayCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q")?.toLowerCase() || "";

  const slides = [
    { id: 1, image: img1, alt: "Krem Hidratues", link: "/products?q=krem" },
    { id: 2, image: img2, alt: "Serum për mjekër", link: "/products?q=serum" },
    { id: 3, image: img3, alt: "Scrub Fytyre", link: "/products?q=scrub" },
    { id: 4, image: img4, alt: "Shampo Bimore", link: "/products?q=shampo" },
    {
      id: 5,
      image: img5,
      alt: "Cleanser Amino Men",
      link: "/products?q=cleanser",
    },
    { id: 6, image: img6, alt: "Locion Trupi", link: "/products?q=locion" },
  ];

  useEffect(() => {
    startAutoplay();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevSlide();
      } else if (e.key === "ArrowRight") {
        handleNextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlide]);

  const startAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 2000);
    }
  };

  const handlePrevSlide = () => {
    setActiveSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  const handleNextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const difference = touchStart - touchEnd;

    // If swipe distance is significant enough
    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        // Swipe left - go to next slide
        handleNextSlide();
      } else {
        // Swipe right - go to previous slide
        handlePrevSlide();
      }
    }
  };

  return (
    <div
      className="position-relative mt-4 mb-5"
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      <div
        className="carousel slide"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="carousel-inner rounded shadow overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item ${
                index === activeSlide ? "active" : ""
              }`}
              style={{ display: index === activeSlide ? "block" : "none" }}
            >
              <a href={slide.link} className="d-block position-relative">
                <img
                  src={slide.image}
                  className="d-block w-100"
                  alt={slide.alt}
                  style={{
                    height: "350px",
                    width: "100%",
                    objectFit: "contain",
                    transition: "transform 0.5s ease",
                    transform: isPaused ? "scale(1.05)" : "scale(1)",
                  }}
                />

                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    opacity: isPaused ? "1" : "0",
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <div
                    className="bg-dark bg-opacity-75 text-white px-4 py-2 rounded-pill"
                    style={{
                      opacity: isPaused ? "1" : "0",
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    {slide.alt}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Slide counter */}
        <div
          className="position-absolute top-0 end-0 mt-2 me-2 bg-dark bg-opacity-75 text-white px-2 py-1 rounded-pill"
          style={{ fontSize: "0.8rem" }}
        >
          {activeSlide + 1}/{slides.length}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          onClick={handlePrevSlide}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.5)",
            top: "50%",
            transform: "translateY(-50%)",
            left: "10px",
          }}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          onClick={handleNextSlide}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.5)",
            top: "50%",
            transform: "translateY(-50%)",
            right: "10px",
          }}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Progress bar */}
      <div className="progress mt-2" style={{ height: "4px" }}>
        <div
          className="progress-bar progress-bar-animated bg-primary"
          role="progressbar"
          style={{
            width: isPaused ? "0%" : "100%",
            transition: isPaused ? "none" : "width 2s linear",
          }}
        ></div>
      </div>

      {/* Thumbnail indicators */}
      <div className="d-flex justify-content-center mt-3 gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => handleSlideChange(index)}
            className={`p-0 border-0 ${
              index === activeSlide
                ? "opacity-100 transform scale-110"
                : "opacity-70"
            }`}
            style={{
              width: "50px",
              height: "30px",
              transition: "all 0.3s ease",
              overflow: "hidden",
              borderRadius: "4px",
            }}
            aria-label={`Slide ${index + 1}`}
          >
            <img
              src={slide.image}
              alt={`Thumbnail ${index + 1}`}
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
