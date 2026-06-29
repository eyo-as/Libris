import { useCallback, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getReadingItemById } from "../services/itemsService";
import { useFetch } from "../hooks/useFetch";

const ReadingDetail = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();

  // Create a stable callback function wrapper to target this unique ID record
  const fetchSingleItem = useCallback(
    () => getReadingItemById(itemId),
    [itemId],
  );
  const { data: item, loading, error, refetch } = useFetch(fetchSingleItem);
  console.log(item);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading)
    return (
      <div>
        <p>Loading book log notes...</p>
      </div>
    );
  if (error)
    return (
      <div>
        <p>Error loading item: {error}</p>
        <Link to="/reading">Back to Library</Link>
      </div>
    );
  if (!item)
    return (
      <div>
        <p>No log records found for this entry.</p>
      </div>
    );
  return (
    <main>
      <header>
        <Link to="/reading">← Back to Dashboard</Link>
        <h1>{item.title}</h1>
      </header>

      <section style={{ margin: "1.5rem 0", lineHeight: "1.6" }}>
        <p>
          <strong>Author:</strong> {item.author || "Not specified"}
        </p>
        <p>
          <strong>Reading Status:</strong> {item.status}
        </p>

        <div
          style={{
            marginTop: "1.5rem",
            borderTop: "1px solid #eee",
            paddingTop: "1rem",
          }}
        >
          <h4>My Book Notes & Thoughts:</h4>
          <p
            style={{
              whiteSpace: "pre-wrap",
              backgroundColor: "#f9f9f9",
              padding: "1rem",
              borderRadius: "4px",
            }}
          >
            {item.notes || "No notes taken yet."}
          </p>
        </div>
      </section>

      <footer>
        <button onClick={() => navigate(`/reading/edit/${item._id}`)}>
          Edit This Log
        </button>
      </footer>
    </main>
  );
};

export default ReadingDetail;
