import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Ticket to Ride</h1>
      <Link to="/game">Iniciar Jogo</Link>
    </div>
  );
}
