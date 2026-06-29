import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createReadingItem } from "../services/itemsService";

const ReadingForm = () => {
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const statusRef = useRef(null);
  const notesRef = useRef(null);

  const [error, setError] = useState(null);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const navigate = useNavigate();

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
      await createReadingItem(itemData);
      navigate("/reading");
    } catch (err) {
      setError(err);
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <div>
      <div>
        <h2>Create reading item</h2>
      </div>
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
            {isSubmiting ? "Adding book... " : "Add to Library"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReadingForm;
