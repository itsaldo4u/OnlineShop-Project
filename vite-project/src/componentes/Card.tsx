import ButtonTest from "../ButtonTest";

type Props = {
  emri: string;
  mbiemri: string;
  mosha: number;
  status: string;
  onStatusChange: () => void;
};

const Card = ({ emri, mbiemri, mosha, status, onStatusChange }: Props) => {
  return (
    <div
      style={{
        width: "320px",
        height: "320px",
        backgroundColor: "#1e1e2f",
        color: "#fff",
        borderRadius: "15px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "Arial, sans-serif",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.3)";
      }}
    >
      <img
        src="logo.jpg"
        alt="Avatar"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "15px",
          border: "2px solid #fff",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      />
      <div style={{ textAlign: "center", lineHeight: "1.6" }}>
        <p>
          <strong>Emri:</strong> {emri}
        </p>
        <p>
          <strong>Mbiemri:</strong> {mbiemri}
        </p>
        <p>
          <strong>Mosha:</strong> {mosha}
        </p>
        <p>
          <strong>Statusi:</strong> {status}
        </p>
      </div>
      <ButtonTest text="Ndrysho Statusin" onButtonClick={onStatusChange} />
    </div>
  );
};

export { Card };
