Medicine Finder App README
Overview
A React-based web application that connects to the FDA API to search for drugs, view detailed drug information, and manage user favorites. Features a modern UI with reusable components for navigation, search, and content display.

Key Features
Drug Search: Search FDA database by drug name or keywords.

Drug Details: View comprehensive drug information including dosage, side effects, warnings.

Favorites: Save and manage favorite drugs for quick access.

Responsive Design: Mobile-friendly interface with header, navbar, and footer.

Folder Structure

src/
├── components/
│ ├── Header
│ ├── Navbar
│ ├── Home
│ ├── DrugSearch
│ ├── DrugDetails
│ ├── Favorite
│ ├── CollabsCard
│ ├── Footer
│ └── API/  
│ └── fdaApi.js  
├── utils/
│ └── drugHelpers.js  
│  
└── App.jsx

Core Functionality
Home Page: Welcome screen with prominent search bar.

Search: Query FDA API for drugs → display results.

Drug Details: Click drug → view full FDA data.

Favorites: Heart icon to save/remove drugs from list.

Navigation: Consistent navbar across all pages.

Tech Stack
React: Frontend framework

FDA API: Drug database

CSS: Modern responsive styling using Tailwind CSS

Local Storage: Favorites persistence

Usage

1. npm install
2. npm start
3. Search drugs via home page
4. View details or add to favorites
5. Access favorites anytime
