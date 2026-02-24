export default function Footer() {
  return (
    <footer className="footer bg-gray-900/90 backdrop-blur-sm border-t border-gray-800/50  ">
      <div className="wrapper max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <nav className="header__nav flex flex-wrap justify-center md:justify-start md:items-center text-center md:text-left gap-5 md:gap-8 lg:gap-10">
          {/* ZozoPharma Logo */}
          <a
            href="/"
            className="header__home font-bold text-xl md:text-2xl lg:text-3xl leading-none text-white no-underline flex-1 md:flex-none md:mr-auto md:font-black hover:text-blue-300 transition-colors"
          >
            MedicineFinder
            <span className="sr-only">(to home page)</span>
          </a>

          {/* Social Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="https://github.com/muzdalifah20"
              className="header__social inline-block p-3 hover:scale-110 hover:bg-white/10 rounded-xl transition-all duration-300 group"
              aria-label="GitHub"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-blue-400 transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.77 8.2 11.35.6.11.82-.26.82-.58 0-.29-.01-1.04-.01-2.04-3.33.72-4.04-1.6-4.04-1.6C3.3 17.43 2.66 16.68 2.66 16.68c-.38-1-.92-1.27-.92-1.27-.75-.52-.18-.51.06-.51H4.7c.74 0 1.33.57 1.47 1.18.4 1.22 1.07 1.54 1.63 1.67.12.05.46.09 1.08-.16.39-.14 1.15-.83 1.23-1.62 0-1.46-.05-2.64-.03-5.14-.07-.15-.3-.77.07-1.61 0 0 .6-.19 2 .23.58-.16 1.2-.24 1.82-.24.62 0 1.24.08 1.82.24 1.4-1.42 2.07-1.61 2.07-1.61.38.84.14 1.46.07 1.61.05 2.5-.02 4.68-.02 5.14.08.74.46 1.32 1.23 1.62.87.26 1.56.23 1.74.17.53-.13 1.24-.45 1.63-1.67.15-.61.73-1.18 1.47-1.18H21c.24 0 .46.13.54.34.08.21.03.5-.18.67 0 0-1.59.51-3.04 1.6-.56.1-1.17.16-1.77.16 1.34 1.14 2.41 2.49 2.41 4.03 0 5.92-3.61 6.36-7.16 6.69.56.48 1.07 1.4 1.07 2.82 0 2.04-.02 3.69-.02 4.19 0 .32.22.69.83.57C20.56 21.77 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            <a
              href="https://linkedin.com/in/yourusername"
              className="header__social inline-block p-3 hover:scale-110 hover:bg-white/10 rounded-xl transition-all duration-300 group"
              aria-label="LinkedIn"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-blue-400 transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
}
