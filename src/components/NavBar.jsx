import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-200 text-white p-4 shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center space-x-4">
        <Link to="/" className="text-xl font-bold">
          💊 MedicineFinder
        </Link>
        <div className="space-x-4">
          <Link to="/favorites" className="hover:underline">
            Favorites
          </Link>
          <Link to="/categories" className="hover:underline">
            Categories
          </Link>
        </div>
      </div>
    </nav>
  );
}
