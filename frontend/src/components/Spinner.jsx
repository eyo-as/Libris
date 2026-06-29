const Spinner = () => {
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-opacity duration-200 hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-70"
        disabled
      >
        <svg
          className="h-4 w-4 animate-spin text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://w3.org"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Processing...
      </button>
    </>
  );
};

export default Spinner;
