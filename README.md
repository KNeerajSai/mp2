# MP2: New Clear REACTive App - Pokemon Explorer

A modern React TypeScript application that provides an interactive interface for exploring Pokemon data using the PokeAPI.

##  Features

### List View
- **Search Functionality**: Real-time search by Pokemon name, ID, or type
- **Sorting Options**: Sort by ID, Name, Height, Weight, or Base Experience
- **Bidirectional Sorting**: Toggle between ascending and descending order
- **Responsive Grid Layout**: Beautiful cards displaying Pokemon information

### Gallery View
- **Image Gallery**: Stunning Pokemon artwork display
- **Type Filtering**: Filter Pokemon by one or multiple types
- **Interactive Filters**: Toggle type filters with visual feedback
- **Hover Effects**: Smooth animations and overlay information

### Detail View
- **Comprehensive Information**: Detailed Pokemon stats, abilities, and description
- **Navigation Controls**: Previous/Next buttons to cycle through Pokemon
- **URL Routing**: Direct links to specific Pokemon details
- **Responsive Design**: Optimized for desktop and mobile devices

##  Technologies Used

- **React 18** with **TypeScript**
- **React Router** for routing
- **Axios** for API calls
- **CSS Modules** for styling
- **PokeAPI** for Pokemon data
- **GitHub Pages** for deployment

##  Design Features

- Modern gradient backgrounds
- Glass morphism effects
- Responsive design for all screen sizes
- Pokemon type-based color coding
- Smooth animations and transitions
- Loading states and error handling

##  Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones
- All major browsers

##  Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR-USERNAME/mp2.git
cd mp2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

##  Deployment

The app is automatically deployed to GitHub Pages using GitHub Actions.

### Manual Deployment
```bash
npm run deploy
```

##  Project Structure

```
src/
├── components/           # Reusable components
│   └── Navigation.tsx   # Navigation bar
├── pages/               # Page components
│   ├── HomePage.tsx     # Landing page
│   ├── ListView.tsx     # Pokemon list with search and sort
│   ├── GalleryView.tsx  # Pokemon gallery with filters
│   └── DetailView.tsx   # Detailed Pokemon information
├── services/            # API services
│   └── pokemonApi.ts    # PokeAPI integration
├── hooks/               # Custom React hooks
│   └── usePokemon.ts    # Pokemon data management
├── types/               # TypeScript type definitions
│   └── pokemon.ts       # Pokemon interfaces
├── styles/              # CSS Modules
│   ├── Navigation.module.css
│   ├── HomePage.module.css
│   ├── ListView.module.css
│   ├── GalleryView.module.css
│   └── DetailView.module.css
└── App.tsx              # Main app component
```

##  Assignment Requirements Fulfilled

###  List View
- [x] Search bar that filters as you type
- [x] Sort by multiple properties (ID, Name, Height, Weight, Experience)
- [x] Ascending and descending order for all sort options
- [x] Displays relevant Pokemon data from API

###  Gallery View
- [x] Displays Pokemon artwork/images
- [x] Filter by Pokemon types (18+ type filters)
- [x] Multiple filter selection capability
- [x] Visual feedback for active filters

###  Detail View
- [x] Accessible from both List and Gallery views
- [x] Displays comprehensive Pokemon details
- [x] Previous/Next navigation buttons
- [x] Specific URL routes for each Pokemon

###  Technical Requirements
- [x] React with TypeScript
- [x] React Router for routing
- [x] Axios for API calls
- [x] No inline styling
- [x] Responsive design
- [x] Error handling and loading states

##  Features Beyond Requirements

- **Loading States**: Elegant spinners and loading indicators
- **Error Handling**: Graceful error handling with user-friendly messages
- **Performance Optimization**: Memoized computations and lazy loading
- **Accessibility**: Proper semantic HTML and keyboard navigation
- **SEO Friendly**: Proper meta tags and document titles
- **Type Safety**: Comprehensive TypeScript interfaces
- **Modern UI/UX**: Glass morphism, gradients, and smooth animations

##  Pokemon Data

The application uses the [PokeAPI](https://pokeapi.co/) to fetch:
- Pokemon basic information (name, ID, types)
- Detailed stats (HP, Attack, Defense, etc.)
- Abilities and characteristics
- High-quality artwork and sprites
- Species information and descriptions

##  Demo

[View Live Demo](https://YOUR-USERNAME.github.io/mp2)

##  Developer

Created for CS 409 Web Programming Assignment MP2
University of Illinois at Urbana-Champaign

---

*Built with ❤️ using React and TypeScript*
