import { Link, useNavigate } from "react-router-dom";

export default function ReadingCard({ item, onDelete }) {
  const navigate = useNavigate();

  const handleControlActions = (e, callbackRoutePath) => {
    e.preventDefault(); // Prevents default navigation paths
    e.stopPropagation(); // Blocks click event from bubbling up to open the detail page link!
    navigate(callbackRoutePath);
  };

  const handleDeletionBubbleBreak = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Blocks click event from triggering details routing
    onDelete();
  };

  return (
    <Link to={`/reading/${item._id}`}>
      <article
        style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}
      >
        {/* Main Display Book details */}
        <h3>{item.title}</h3>
        {item.author && <p>Author: {item.author}</p>}
        {item.status && <p>Status: {item.status}</p>}
        {item.notes && <p>Status: {item.notes}</p>}

        <div>
          <button
            onClick={(e) =>
              handleControlActions(e, `/reading/edit/${item._id}`)
            }
          >
            Edit Book
          </button>

          <button onClick={handleDeletionBubbleBreak}>Delete Log</button>
        </div>
      </article>
    </Link>
  );
}
