const LoadingPage = () => {
  return (
    <div className="flex items-top justify-center h-screen bg-lavilavi">
      <div className=" flex flex-col gap-4 text-center items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75 mb-4"></div>
        <h1 className="text-lg font-semibold text-gray-700">
          Loading From Server, please wait...
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          We're fetching the latest content for you!
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
