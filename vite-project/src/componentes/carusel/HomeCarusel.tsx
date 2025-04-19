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

  const startAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 2000); // Change slide every 3 seconds
    }
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

  return (
    <div
      className="position-relative mt-4 mb-5"
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      <div
        className="carousel slide"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
                    height: "350px", // Siguron një lartësi fikse për karuselin
                    width: "100%", // Siguron që imazhi të mbushë gjithë gjerësinë e karuselit
                    objectFit: "contain", // Ruajti proporcionalitetin e imazhit brenda hapësirës
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
                    Click to view
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          className="carousel-control-prev"
          type="button"
          onClick={() =>
            handleSlideChange((activeSlide - 1 + slides.length) % slides.length)
          }
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
          onClick={() => handleSlideChange((activeSlide + 1) % slides.length)}
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

      {/* Indicators */}
      <div className="carousel-indicators position-relative mt-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => handleSlideChange(index)}
            className={`rounded-circle mx-2 ${
              index === activeSlide ? "active" : ""
            }`}
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: index === activeSlide ? "#007bff" : "#dee2e6",
              border: "none",
            }}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
