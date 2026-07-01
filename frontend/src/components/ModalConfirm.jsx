export default function ModalConfirm({ isOpen, onClose, onConfirm, itemName }) {
  // If the control flag says false, don't render anything onto the layout screen
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "0.75rem",
          maxWidth: "400px",
          width: "90%",
        }}
      >
        {/* Warning Header layout structure */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "start" }}>
          <span style={{ color: "red", fontSize: "1.5rem" }}>⚠️</span>
          <div>
            <h3 style={{ margin: "0 0 0.5rem 0" }}>Delete reading item?</h3>
            <p style={{ margin: 0, color: "#555" }}>
              "{itemName || "This item"}" will be permanently removed from your
              library. This cannot be undone.
            </p>
          </div>
        </div>

        {/* Action button triggers matching your panel preview configuration */}
        <div
          style={{
            display: "flex",
            justifycontent: "flex-end",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={onConfirm}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
