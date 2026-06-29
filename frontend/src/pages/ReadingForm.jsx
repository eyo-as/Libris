import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createReadingItem,
  getReadingItemById,
  updateReadingItem,
} from "../services/itemsService";

const ReadingForm = () => {
  const { itemId } = useParams();
  const isEditMode = !!itemId;

  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const statusRef = useRef(null);
  const notesRef = useRef(null);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(isEditMode); // True initially ONLY if editing
  const [isSubmiting, setIsSubmiting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isEditMode) return;

    const loadExistingItemData = async () => {
      try {
        const existingItem = await getReadingItemById(itemId);

        // Safely set the DOM input values directly
        if (titleRef.current) titleRef.current.value = existingItem.title || "";
        if (authorRef.current)
          authorRef.current.value = existingItem.author || "";
        if (statusRef.current)
          statusRef.current.value = existingItem.status || "want to read";
        if (notesRef.current) notesRef.current.value = existingItem.notes || "";
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadExistingItemData();
  }, [itemId, isEditMode]);

  // Dual Submission Handler Flow
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmiting(true);

    const itemData = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      status: statusRef.current.value,
      notes: notesRef.current.value,
    };

    try {
      if (isEditMode) {
        await updateReadingItem(itemId, itemData);
        navigate(`/reading/${itemId}`);
      } else {
        await createReadingItem(itemData);
        navigate("/reading");
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsSubmiting(false);
    }
  };

  if (isLoading)
    return (
      <div>
        <p>Loading database values into form entries...</p>
      </div>
    );

  return (
    <div>
      <header>
        <h2>
          {isEditMode ? "Modify Book Log Entries" : "Create reading item"}
        </h2>
      </header>
      <div>{error && <p>{error}</p>}</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input type="text" ref={titleRef} required placeholder="title" />
        </div>
        <div>
          <label>Author: </label>
          <input type="text" ref={authorRef} placeholder="author" />
        </div>
        <div>
          <label>Status: </label>
          <select ref={statusRef} defaultValue="want to read">
            <option value="want to read">Want to read</option>
            <option value="reading">Reading</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label>notes: </label>
          <input type="text" ref={notesRef} placeholder="notes" />
        </div>
        <div>
          <button type="submit" disabled={isSubmiting}>
            {isSubmiting
              ? "Saving Adjustment... "
              : isEditMode
                ? "Save Changes"
                : "Add to Library"}
          </button>
          <Link to={isEditMode ? `/reading/${itemId}` : "/reading"}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ReadingForm;
