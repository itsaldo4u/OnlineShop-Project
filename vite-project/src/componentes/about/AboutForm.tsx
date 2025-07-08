const AboutForm = () => {
  return (
    <div
      style={{
        position: "relative",
        maxWidth: "1000px",
        margin: "30px auto",
        padding: "30px",
        borderRadius: "16px",
        fontFamily: "'Poppins', sans-serif",
        overflow: "hidden",
        color: "#fff",
        zIndex: 1,
        backgroundImage: `url("/aboutimg.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      }}
    >
      {/* Overlay për sfond të errët për tekstin */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: -1,
        }}
      />

      {/* Titulli kryesor */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "40px",
          marginBottom: "10px",
          fontWeight: "700",
          letterSpacing: "1px",
        }}
      >
        About Our Brand
      </h1>

      {/* Vijë ndarëse dekorative */}
      <div
        style={{
          width: "80px",
          height: "4px",
          backgroundColor: "#00d8a0",
          margin: "0 auto 30px",
          borderRadius: "2px",
        }}
      />

      {/* Paragrafë të organizuar vizualisht */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#ddd" }}>
          We offer{" "}
          <span style={{ color: "#00d8a0", fontWeight: "600" }}>
            premium products
          </span>{" "}
          for men's daily care.
        </p>
        <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#ccc" }}>
          Designed for those who appreciate{" "}
          <span style={{ fontStyle: "italic" }}>
            style, cleanliness, and efficiency
          </span>
          .
        </p>
        <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#bbb" }}>
          Science and nature in a balanced combination for real results.
        </p>
      </div>

      {/* Seksioni me foto dhe tekst */}
      <div
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: "23px", marginBottom: "12px", color: "#fff" }}>
            For Men Who Want the Best
          </h2>
          <p style={{ fontSize: "17px", lineHeight: "1.7", color: "#ddd" }}>
            Each product is made with pure and powerful ingredients to improve
            your daily routine. We believe in care with class and quality.
          </p>
        </div>
      </div>

      {/* Butoni në fund në qendër */}
      <div
        style={{
          marginTop: "60px",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <button
          onClick={() => (window.location.href = "/product")}
          style={{
            padding: "14px 36px",
            fontSize: "18px",
            borderRadius: "30px",
            backgroundColor: "#00d8a0",
            color: "#000",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#00c295";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#00d8a0";
          }}
        >
          Browse Products
        </button>
      </div>
    </div>
  );
};

export default AboutForm;
