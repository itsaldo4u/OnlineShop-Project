import React from "react";
import { Link } from "react-router-dom";

interface TestimonialCardProps {
  quote: string;
  imageSrc: string;
  name: string;
  company?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  imageSrc,
  name,
  company,
}) => (
  <div
    style={{
      width: "280px",
      backgroundColor: "#2f2f44",
      borderRadius: "15px",
      padding: "25px",
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.4)",
      textAlign: "center",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      position: "relative",
      overflow: "hidden",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "translateY(-8px)";
      e.currentTarget.style.boxShadow = "0 20px 35px rgba(0, 0, 0, 0.5)";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.4)";
    }}
  >
    <div
      style={{
        position: "absolute",
        top: "15px",
        left: "15px",
        fontSize: "2.5rem",
        color: "rgba(255, 255, 255, 0.1)",
        fontFamily: "Georgia, serif",
        lineHeight: 1,
      }}
    >
      "
    </div>
    <p
      style={{
        fontSize: "1.1rem",
        marginBottom: "20px",
        lineHeight: "1.6",
        position: "relative",
        fontStyle: "italic",
        color: "#e0e0ff",
      }}
    >
      {quote}
    </p>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "25px",
      }}
    >
      <div
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "3px solid #4a4a6b",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
          marginBottom: "12px",
        }}
      >
        <img
          src={imageSrc}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <p
        style={{
          fontSize: "1.1rem",
          fontWeight: "bold",
          margin: "0",
          color: "#ffffff",
        }}
      >
        {name}
      </p>
      {company && (
        <p style={{ fontSize: "0.9rem", color: "#a0a0c0", marginTop: "4px" }}>
          {company}
        </p>
      )}
    </div>
  </div>
);

const FeedbackSection: React.FC = () => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 20px",
        backgroundColor: "#1e1e2f",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(90,90,150,0.15) 0%, rgba(30,30,47,0) 70%)",
          zIndex: "1",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(90,90,150,0.1) 0%, rgba(30,30,47,0) 70%)",
          zIndex: "1",
        }}
      ></div>

      <div style={{ position: "relative", zIndex: "2", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              marginBottom: "15px",
              background: "linear-gradient(135deg, #e0e0ff 0%, #a0a0ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            What Our Clients Say
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              maxWidth: "700px",
              margin: "0 auto",
              color: "#a0a0c0",
              lineHeight: "1.6",
            }}
          >
            Real experiences from customers who have used our products and
            services
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          <TestimonialCard
            quote="This product is excellent! The quality is outstanding and the price very reasonable. I will always recommend it to friends and family."
            imageSrc="/klienti.jpg"
            name="Alban Berisha"
            company="Marketing Director"
          />

          <TestimonialCard
            quote="It has helped me a lot in my daily life. The product is high quality and the customer service is excellent. I highly appreciate your professionalism!"
            imageSrc="/klientja.jpg"
            name="Elona Krasniqi"
            company="Architect"
          />

          <TestimonialCard
            quote="An excellent experience with your product. The usage method is simple and the results are visible. Thank you very much for this solution!"
            imageSrc="/klientii.jpg"
            name="Besnik Hoxha"
            company="Engineer"
          />
        </div>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Link
            to="/contact"
            style={{
              backgroundColor: "#007bff",
              padding: "12px 30px",
              color: "#fff",
              borderRadius: "30px",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "1rem",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#007bff")
            }
          >
            Leave a Comment
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
