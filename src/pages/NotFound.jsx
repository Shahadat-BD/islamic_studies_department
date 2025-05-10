import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl mt-4 text-gray-700">Page Not Found</p>
      <Link
        to="/"
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
