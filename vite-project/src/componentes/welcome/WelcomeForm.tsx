export default function WelcomeForm() {
  return (
    <>
      <style>
        {`
    @keyframes slideIn {
      0% {
        opacity: 0;
        transform: translateX(-100%);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `}
      </style>
      <section
        style={{
          color: "white",
          width: "100%",
          backgroundImage: 'url("/picdefault.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "560px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 20px",
          position: "relative",
        }}
      >
        <h1
          style={{
            color: "white",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "3rem",
            fontWeight: "bold",
            textAlign: "center",
            opacity: 0,
            animation: "slideIn 2s forwards",
          }}
        >
          Welcome to Our Website!
        </h1>
      </section>
    </>
  );
}
