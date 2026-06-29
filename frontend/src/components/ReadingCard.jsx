import { Link, useNavigate } from "react-router-dom";

export default function ReadingCard({ item, onDelete }) {
  const navigate = useNavigate();

  return (
    <article
      style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}
    >
      <Link to={`/reading/${item._id}`}>
        {/* Main Display Book details */}
        <h3>{item.title}</h3>
        {item.author && <p>Author: {item.author}</p>}
        {item.status && <p>Status: {item.status}</p>}
        {item.notes && <p>Status: {item.notes}</p>}

        <div>
          <button onClick={() => navigate(`/reading/edit/${item._id}`)}>
            Edit Book
          </button>

          <button onClick={() => onDelete(item._id)}>Delete Log</button>
        </div>
      </Link>
    </article>
  );
}
