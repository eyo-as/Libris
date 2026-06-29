import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getReadingItems } from "../services/itemsService";
import { useEffect } from "react";

const ReadingList = () => {
  const navigate = useNavigate();

  const { data: items, loading, error, refetch } = useFetch(getReadingItems);
  console.log(items);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return (
      <div>
        <p>Loading your reading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={refetch}>Try Again</button>
      </div>
    );
  }

  return (
    <main>
      {/* Dashboard Header Bar Section */}
      <header>
        <h1>My Reading Tracker</h1>
        <button onClick={() => navigate("/reading/new")}>
          Add New Book Log
        </button>
      </header>

      {/* Empty State vs Content Mapping Engine Conditional Check */}
      <section>
        {items?.length === 0 ? (
          <div>
            <p>No books logged yet. Your reading list is empty!</p>
          </div>
        ) : (
          <div>
            {items?.map((item) => (
              <ul key={item._id} item={item}>
                <li>{item.title}</li>
              </ul>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default ReadingList;
