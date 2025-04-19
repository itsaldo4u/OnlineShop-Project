const AboutForm = () => {
  return (
    <div
      style={{
        position: "relative",
        maxWidth: "1000px",
        margin: "50px auto",
        padding: "40px",
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
        Rreth Brandit Tonë
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
          gap: "20px",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#ddd" }}>
          Ne ofrojmë{" "}
          <span style={{ color: "#00d8a0", fontWeight: "600" }}>
            produkte premium
          </span>{" "}
          për kujdesin e përditshëm të meshkujve.
        </p>
        <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#ccc" }}>
          Të dizajnuara për ata që vlerësojnë{" "}
          <span style={{ fontStyle: "italic" }}>
            stilin, pastërtinë dhe efikasitetin
          </span>
          .
        </p>
        <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#bbb" }}>
          Shkenca dhe natyra në një kombinim të balancuar për rezultate të
          vërteta.
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
          <h2 style={{ fontSize: "26px", marginBottom: "12px", color: "#fff" }}>
            Për meshkuj që duan më të mirën
          </h2>
          <p style={{ fontSize: "17px", lineHeight: "1.7", color: "#ddd" }}>
            Çdo produkt është krijuar me përbërës të pastër dhe të fuqishëm për
            të përmirësuar rutinën tuaj të përditshme. Ne besojmë në kujdes me
            klas dhe cilësi.
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
          Shfleto Produktet
        </button>
      </div>
    </div>
  );
};

export default AboutForm;
