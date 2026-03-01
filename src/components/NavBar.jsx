import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-3 sm:py-4 md:py-5">
          <Link
            to="/"
            className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 flex items-center gap-2"
          >
            💊 MedicineFinder
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link
              to="/favorites"
              className="px-4 py-2 text-sm lg:text-base font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
            >
              ❤️ Favorites
            </Link>

            {/* Social Icons */}
            <div className="flex items-center gap-2 lg:gap-3">
              <Link
                to="https://github.com"
                className="p-2 hover:scale-110 hover:bg-white/10 rounded-xl transition-all duration-300 group"
              >
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6 text-white group-hover:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.77 8.2 11.35.6.11.82-.26.82-.58 0-.29-.01-1.04-.01-2.04-3.33.72-4.04-1.6-4.04-1.6C3.3 17.43 2.66 16.68 2.66 16.68c-.38-1-.92-1.27-.92-1.27-.75-.52-.18-.51.06-.51H4.7c.74 0 1.33.57 1.47 1.18.4 1.22 1.07 1.54 1.63 1.67.12.05.46.09 1.08-.16.39-.14 1.15-.83 1.23-1.62 0-1.46-.05-2.64-.03-5.14-.07-.15-.3-.77.07-1.61 0 0 .6-.19 2 .23.58-.16 1.2-.24 1.82-.24.62 0 1.24.08 1.82.24 1.4-1.42 2.07-1.61 2.07-1.61.38.84.14 1.46.07 1.61.05 2.5-.02 4.68-.02 5.14.08.74.46 1.32 1.23 1.62.87.26 1.56.23 1.74.17.53-.13 1.24-.45 1.63-1.67.15-.61.73-1.18 1.47-1.18H21c.24 0 .46.13.54.34.08.21.03.5-.18.67 0 0-1.59.51-3.04 1.6-.56.1-1.17.16-1.77.16 1.34 1.14 2.41 2.49 2.41 4.03 0 5.92-3.61 6.36-7.16 6.69.56.48 1.07 1.4 1.07 2.82 0 2.04-.02 3.69-.02 4.19 0 .32.22.69.83.57C20.56 21.77 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Mobile Favorites */}
          <Link
            to="/favorites"
            className="md:hidden p-2 rounded-xl hover:bg-white/20 transition-all duration-300"
            aria-label="Favorites"
          >
            <span className="text-2xl">❤️</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
