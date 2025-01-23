const AddPostButton = () => {
  return (
    <button className="w-52 h-52 flex flex-col justify-center items-center rounded-full border-dotted border-4 border-indigo-600 shadow-lg transition-transform transform hover:scale-105 bg-gradient-to-br from-blue-500 to-[#4169E1]">
      {/* Pen Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="white"
        className="w-12 h-12 mb-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 3.487a2.25 2.25 0 113.181 3.182L7.5 19.5l-4.5 1 1-4.5 12.862-12.513z"
        />
      </svg>
      {/* Button Text */}
      <span className="text-white font-bold text-lg">Create A Post</span>
    </button>
  );
};

export default AddPostButton;
