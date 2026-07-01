import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { deleteReadingItem, getReadingItems } from "../services/itemsService";
import { useState } from "react";
import ReadingCard from "../components/ReadingCard";
import ModalConfirm from "../components/ModalConfirm";

const ReadingList = () => {
  const navigate = useNavigate();

  const {
    data: items,
    setData: setItems,
    loading,
    error,
    refetch,
  } = useFetch(getReadingItems);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const handleOpenDeleteModal = (item) => {
    setActiveItem(item);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!activeItem) return;

    try {
      await deleteReadingItem(activeItem._id);

      const updatedList = items.filter((item) => item._id !== activeItem._id);
      setItems(updatedList);
    } catch (err) {
      alert("item can't be deleted");
      console.error(err);
    } finally {
      setIsModalOpen(false);
      setActiveItem(null);
    }
  };

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
              <ReadingCard
                key={item._id}
                item={item}
                onDelete={() => handleOpenDeleteModal(item)}
              />
            ))}
          </div>
        )}
      </section>
      <ModalConfirm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={activeItem?.title}
      />
    </main>
  );
};

export default ReadingList;
