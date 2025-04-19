import { useState } from "react";

type ProductCardProps = {
  img: string;
  title: string;
  description: string;
  price: string;
  tags: string[];
};

export default function ProductCard({
  img,
  title,
  description,
  price,
  tags,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImgHovered, setIsImgHovered] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  return (
    <div
      style={{
        height: "500px",
        width: "320px",
        backgroundColor: "#1e1e2f",
        color: "#fff",
        borderRadius: "15px",
        boxShadow: isHovered
          ? "0 15px 30px rgba(0, 0, 0, 0.4)"
          : "0 10px 25px rgba(0, 0, 0, 0.3)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "Arial, sans-serif",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ position: "relative" }}>
        <img
          src={img}
          alt={title}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "15px",
            border: "2px solid #fff",
            transition: "transform 0.3s ease",
            transform: isImgHovered ? "scale(1.1)" : "scale(1)",
          }}
          onMouseEnter={() => setIsImgHovered(true)}
          onMouseLeave={() => setIsImgHovered(false)}
        />
        <span
          style={{
            position: "absolute",
            bottom: "10px",
            right: "-5px",
            backgroundColor: "#007bff",
            color: "white",
            fontSize: "0.7rem",
            fontWeight: "bold",
            padding: "3px 8px",
            borderRadius: "20px",
          }}
        >
          NEW
        </span>
      </div>

      <div
        style={{
          textAlign: "center",
          lineHeight: "1.6",
          padding: "10px",
          width: "100%",
        }}
      >
        <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>{title}</h3>
        <p style={{ fontSize: "0.9rem", color: "#aab0bc" }}>{description}</p>

        <div
          style={{
            backgroundColor: "#16162a",
            borderRadius: "10px",
            padding: "12px",
            marginTop: "15px",
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {tags.map((tag, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                  fontSize: "0.9rem",
                }}
              >
                <span style={{ color: "#4cd964", marginRight: "8px" }}>✓</span>
                <span>{tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ width: "100%", marginTop: "15px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <span style={{ fontSize: "0.8rem", color: "#aab0bc" }}>Çmimi</span>
          <span style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
            {price}
          </span>
        </div>

        <button
          style={{
            width: "100%",
            backgroundColor: isBtnHovered ? "#0056b3" : "#007bff",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "30px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "500",
          }}
          onMouseEnter={() => setIsBtnHovered(true)}
          onMouseLeave={() => setIsBtnHovered(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "8px" }}
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Blej Tani
        </button>
      </div>
    </div>
  );
}
