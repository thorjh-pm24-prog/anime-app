# 🎬 Anime Search Application

A modern, production-ready anime search and discovery web application built with React, TypeScript, and Tailwind CSS. Search from thousands of anime titles using the Jikan API (MyAnimeList database).

![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38BDF8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite)

## ✨ Features

### Core Functionality
- **🔍 Smart Search**: Real-time anime search with 400ms debouncing and content filtering
- **📑 Pagination**: Navigate through search results with intelligent page controls and URL state
- **🎯 Filters**: Filter anime by type, status, rating, and year
- **🔄 Sorting**: Sort results by title, score, popularity, or year
- **📱 Responsive Design**: Seamless experience across mobile, tablet, and desktop devices
- **❤️ Favorites System**: Save your favorite anime with persistent local storage
- **🎨 Modern UI**: Clean, intuitive interface with smooth animations
- **🛡️ Content Safety**: Automatic filtering of inappropriate/sensitive content

### Advanced Features
- **⚡ Performance Optimized**: Request debouncing, lazy image loading, and smart caching
- **🔄 Retry Mechanism**: Automatic retry on failed requests with exponential backoff (up to 3 retries)
- **♿ Accessibility**: ARIA labels, keyboard navigation, and semantic HTML
- **📊 Loading States**: Beautiful skeleton loaders and spinners
- **🎉 Toast Notifications**: User-friendly feedback for actions
- **🔝 Scroll to Top**: Automatic smooth scroll to top on pagination
- **🌐 Deep Linking**: Shareable URLs with filter and page state
- **🎭 Image Lazy Loading**: Optimized image loading with placeholders
- **⚠️ Error Handling**: Comprehensive error states with retry options
- **📈 Rate Limit Handling**: Handles API 429 errors with automatic retry

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI library for building component-based interfaces |
| **TypeScript 5.3** | Type-safe development and better code quality |
| **React Router v6** | Client-side routing and navigation |
| **Zustand 4.4** | Lightweight state management for favorites |
| **Axios 1.6** | HTTP client with interceptors and error handling |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **Vite 6.2** | Fast build tool and development server |
| **Jikan API v4** | Free MyAnimeList API |

## 📦 Project Structure

```
react-anime/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── index.tsx          # Reusable UI components (LoadingSpinner, ErrorMessage, Badge)
│   │   ├── AnimeCard.tsx          # Individual anime card with favorite button
│   │   ├── FilterBar.tsx          # Filter options (type, status, rating, year)
│   │   ├── Header.tsx             # Navigation header with favorites counter
│   │   ├── Pagination.tsx         # Pagination controls with smart page numbers
│   │   ├── SearchBar.tsx          # Search input with debouncing support
│   │   ├── ScrollToTop.tsx        # Floating scroll-to-top button
│   │   ├── Skeleton.tsx           # Loading skeleton component
│   │   ├── SortBar.tsx            # Sort options (title, score, popularity)
│   │   └── Toast.tsx              # Toast notification system with context
│   ├── hooks/
│   │   └── index.ts               # Custom hooks (useAnimeSearch, useAnimeDetail, useDebounce)
│   ├── pages/
│   │   ├── AnimeListPage.tsx      # Main search and listing page
│   │   └── AnimeDetailPage.tsx    # Detailed anime information page
│   ├── services/
│   │   └── api.ts                 # API client with axios instance and error handling
│   ├── stores/
│   │   └── animeStore.ts          # Zustand store for favorites with localStorage sync
│   ├── types/
│   │   └── index.ts               # TypeScript type definitions
│   ├── App.tsx                    # Router configuration and app setup
│   ├── main.tsx                   # React entry point
│   └── index.css                  # Global styles and animations
├── package.json                   # Dependencies and npm scripts
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.node.json             # TypeScript config for Vite/Node
├── vite.config.js                 # Vite configuration
├── eslint.config.js               # ESLint configuration
├── index.html                     # HTML template
└── README.md                       # This documentation
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.x or higher
- **npm** 9.x or **yarn** 1.22.x or higher
- Git (for version control)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/react-anime.git
cd react-anime
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run development server**
```bash
npm run dev
# or
yarn dev
```

The application will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

Production-optimized build will be created in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 📝 Usage Guide

### Search Anime
1. Enter anime name or keywords in the search bar
2. Results appear in real-time with 400ms debouncing
3. Search query is maintained across page navigation
4. Leave search empty to see popular anime

### View Details
1. Click on any anime card to view full details
2. See poster image, trailer (if available), ratings, and full synopsis
3. Use the back button to return to search results
4. Anime details page shows all available information

### Manage Favorites
1. Click the heart icon (❤️ or 🤍) on any anime card
2. Heart turns red (❤️) when favorited
3. Favorites are saved to local storage automatically
4. View your total favorites count in the header
5. Favorites persist across browser sessions

### Navigate Results
- Use Previous/Next buttons for pagination
- Click page numbers to jump to specific page
- Previous button disabled on page 1
- Next button disabled on last page
- Page changes reflected in URL for sharing
- Smooth scroll to top when changing pages

### Apply Filters (Bonus Feature)
- Click FilterBar to access filter options
- Filter by anime type (TV, Movie, OVA, Special, ONA)
- Filter by status (Airing, Complete, Upcoming)
- Filter by year (past 20 years)
- Filter by rating (G, PG, PG-13, R, R+, Rx)
- Combine multiple filters for refined results

### Sort Results (Bonus Feature)
- Sort by Title, Score, Popularity, or Year
- Choose ascending or descending order
- Sorting applied to current search results

## 🎯 API Integration

### Jikan API v4
The application uses the free Jikan API v4 (https://api.jikan.moe/v4/)

**Documentation**: https://docs.api.jikan.moe/

**Key Endpoints Used:**
- `GET /anime` - Search and list anime with pagination
- `GET /anime/{id}` - Get detailed anime information

**Query Parameters:**
- `q` - Search query string
- `page` - Page number (starts at 1)
- `limit` - Results per page (max 25, default 6)
- `order_by` - Sort field (popularity, score, title)
- `sort` - Sort direction (asc, desc)

**Rate Limiting:**
- API implements 429 rate limiting
- Automatic retry mechanism with 2-second delays
- Maximum 3 retry attempts per request
- Graceful error messages to users

### Request Examples

```typescript
// Search anime with pagination
GET https://api.jikan.moe/v4/anime?q=naruto&page=1&limit=6

// Get popular anime
GET https://api.jikan.moe/v4/anime?order_by=popularity&sort=asc&page=1&limit=6

// Get detailed anime info
GET https://api.jikan.moe/v4/anime/20
```

## 🛡️ Error Handling

The application handles various error scenarios gracefully:

1. **Network Errors**: User-friendly error message with "Try Again" button
2. **API Errors**: Displays error details and suggests actions
3. **Rate Limiting (429)**: Automatic retry with 2-second delay (up to 3 times)
4. **Invalid Anime ID**: Shows "Anime not found" message with back button
5. **Empty Search Results**: Encouraging message to refine search
6. **Missing Data**: Graceful fallbacks for missing fields

## 📱 Responsive Design

The application is fully responsive with mobile-first approach:

**Breakpoints:**
- **Mobile**: < 640px (full-width single column layout)
- **Tablet**: 640px - 1024px (2-column grid)
- **Desktop**: > 1024px (3-column grid)

**Features:**
- Touch-friendly buttons and controls
- Optimized layouts for small screens
- Readable font sizes at all resolutions
- Flexible images and spacing

## ♿ Accessibility Features

- **ARIA Labels**: All interactive elements have proper aria-labels
- **Keyboard Navigation**: Full keyboard support (Tab, Enter, Escape)
- **Semantic HTML**: Proper use of heading, nav, main, footer, button elements
- **Focus Indicators**: Visible focus states for keyboard users
- **Color Contrast**: WCAG AA compliant color ratios (4.5:1+)
- **Alt Text**: All images have meaningful alt text
- **Form Labels**: All inputs have associated labels
- **Disabled States**: Proper disabled button styling

## 🔐 Data Privacy

- **Local Storage Only**: Favorites stored only in browser local storage
- **No User Tracking**: No analytics or tracking code
- **No Personal Data**: Only anime preferences are stored
- **No Server Storage**: All data is client-side
- **Clear Data**: Users can clear favorites by clearing browser data
- **No Third-party Cookies**: No external tracking

## 🚀 Performance Optimizations

1. **Debounced Search**: 400ms debounce prevents excessive API calls
2. **Lazy Image Loading**: `loading="lazy"` attribute on images
3. **Code Splitting**: Route-based code splitting with React Router
4. **Optimized Re-renders**: Proper hooks usage with dependencies
5. **Responsive Images**: Different image handling for devices
6. **CSS Animations**: Hardware-accelerated CSS animations
7. **Bundle Optimization**: Vite's optimized build
8. **Minification**: Production builds minified

**Performance Metrics:**
- Debounce delay: 400ms
- API timeout: 10 seconds
- Retry delay: 2 seconds
- Max retries: 3 attempts

## 🔄 State Management

### Zustand Store (animeStore.ts)
Manages favorites with the following methods:

```typescript
// Add anime to favorites
addFavorite(anime: Anime): void

// Remove anime from favorites
removeFavorite(id: number): void

// Check if anime is favorited
isFavorite(id: number): boolean

// Load from localStorage on app start
loadFavorites(): void
```

### Local Storage
- **Key**: `anime-favorites`
- **Format**: JSON array of Favorite objects
- **Persists**: Across browser sessions
- **Size**: Typically < 10KB for hundreds of favorites

## 🎨 Styling & Customization

The application uses **Tailwind CSS 4** for styling.

### Custom Animations

Located in `src/index.css`:

```css
/* Fade in with slight upward movement (0.3s) */
.animate-fade-in

/* Slide up animation for notifications (0.3s) */
.animate-slide-up

/* Slide in from right animation (0.3s) */
.animate-slide-in-right

/* Shimmer effect for skeleton loaders (2s infinite) */
.animate-shimmer
```

### Customization
- **Colors**: Modify Tailwind config in `tailwind.config.js`
- **Spacing**: Adjust padding/margin in individual components
- **Fonts**: Change font family in `src/index.css`
- **Shadows**: Modify shadow utilities in components

## 🧪 Testing

### Manual Testing Checklist

**Search Functionality**
```
[ ] Enter "Naruto" → Results show Naruto anime
[ ] Leave search empty → Shows popular anime
[ ] Special characters → Handles gracefully
[ ] Multiple searches → Results update correctly
[ ] URL params → Reflect current search
```

**Pagination**
```
[ ] Click next → Navigates to next page
[ ] Click previous → Navigates to previous page
[ ] Click page number → Jumps to specific page
[ ] First page → No previous button click
[ ] Last page → No next button click
[ ] URL updates → Reflects current page
```

**Favorites**
```
[ ] Click heart → Changes to filled heart
[ ] Click again → Returns to empty heart
[ ] Refresh page → Favorites persist
[ ] Header counter → Reflects correct count
[ ] localStorage → Contains favorites data
```

**Error Handling**
```
[ ] Disconnect internet → Shows error
[ ] Click retry → Attempts new request
[ ] Invalid anime ID → Shows "not found"
[ ] API timeout → Shows timeout message
[ ] Clear to test data recovery → Works correctly
```

**Responsive Design**
```
[ ] Mobile (375px) → Single column layout
[ ] Tablet (768px) → Two column layout
[ ] Desktop (1920px) → Three column layout
[ ] Images → Correct aspect ratio
[ ] Text → Readable font sizes
```

## 🐛 Known Issues & Limitations

### Fixed Issues (v1.0.0)
- ✅ **Fixed**: Looping/persistent loading state
- ✅ **Fixed**: Wrong search output (now shows accurate results)
- ✅ **Fixed**: Unrelated content in search results
- ✅ **Fixed**: Double retry logic causing infinite loops
- ✅ **Fixed**: Duplicate concurrent API requests
- ✅ **Added**: Content filtering for inappropriate anime versions

### API Limitations
- Maximum 25 results per page (Jikan API restriction)
- Limited trailers available (YouTube-only)
- Some anime have incomplete data
- Update frequency dependent on MyAnimeList updates
- Rate limiting may affect high-traffic scenarios

### Browser Compatibility
- Requires modern browser with ES2020+ support
- Local storage required for favorites feature
- CSS Grid and Flexbox required
- Tested on:
  - Chrome 90+
  - Firefox 88+
  - Safari 14+
  - Edge 90+

### Performance Considerations
- Large image loading on slow connections (< 1 Mbps) may be slow
- Virtual scrolling not implemented (pagination used instead)
- No offline mode (requires internet connection)
- Local storage quota ~5-10MB per origin

## 🔮 Future Enhancements

Potential improvements for future versions:

**Advanced Functionality**
- [ ] Genre-based filtering with multi-select
- [ ] Infinite scroll pagination option
- [ ] Recommendations based on favorites
- [ ] User watchlist with status tracking
- [ ] Anime comparison tool
- [ ] Reviews and ratings system
- [ ] Social sharing features

**Performance**
- [ ] Virtual scrolling for large lists
- [ ] Service worker for offline support
- [ ] Advanced caching strategy
- [ ] Image optimization with WebP

**UI/UX**
- [ ] Dark mode support
- [ ] Customizable theme colors
- [ ] Favorites view with grid/list toggle
- [ ] Advanced search syntax
- [ ] Search history

**Technical**
- [ ] PWA support
- [ ] Mobile app (React Native)
- [ ] Backend API integration
- [ ] User authentication
- [ ] Analytics dashboard

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [React Router Docs](https://reactrouter.com)
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Jikan API Docs](https://docs.api.jikan.moe)
- [Vite Documentation](https://vitejs.dev)
- [Axios Documentation](https://axios-http.com)

### Tools
- [MDN Web Docs](https://developer.mozilla.org)
- [Can I Use](https://caniuse.com)
- [WebP Converter](https://convertio.co/webp)

## 📄 Design Decisions

### Architecture
- **Component-Based**: Each feature is a reusable, independent component
- **Custom Hooks**: Logic abstracted into hooks for reusability and testing
- **Separation of Concerns**: Clear separation between services, stores, and components
- **Type-Safe**: Full TypeScript coverage for development confidence
- **Modular Styling**: Tailwind CSS for utility-first styling

### Performance
- **Debouncing**: Search input debounced to 400ms to reduce API calls
- **Lazy Loading**: Images load on-demand as they enter viewport
- **Error Recovery**: Automatic retry for failed requests up to 3 times
- **Pagination**: Limited results per page for faster loading
- **Caching**: HTTP cache headers respected for API responses

### UX/UX
- **Progressive Enhancement**: Core functionality works without issues
- **Accessible**: WCAG AAA compliant for inclusive design
- **Responsive**: Mobile-first approach for all devices
- **Feedback**: Visual feedback for all user actions
- **Error States**: Clear error messages with recovery options

## 🤝 Contributing

Contributions are welcome! Please follow this process:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages
- Add comments for complex logic

## 📝 License

This project is licensed under the MIT License - feel free to use in personal or commercial projects.

## 🙏 Acknowledgments

- [Jikan API](https://jikan.moe/) - Free MyAnimeList API
- [MyAnimeList](https://myanimelist.net/) - Comprehensive anime database
- [React Team](https://react.dev) - Excellent UI framework
- [Tailwind Labs](https://tailwindcss.com) - Amazing CSS framework
- Community members who provided feedback and suggestions

## 📞 Support

For issues, questions, or suggestions:
1. Check existing issues on GitHub
2. Review documentation and troubleshooting
3. Open a new issue with detailed description
4. Include browser and OS information
5. Provide steps to reproduce the issue

---

**Project Information**
- **Last Updated**: February 12, 2026
- **Version**: 1.0.0
- **Status**: Production Ready ✅
- **Maintenance**: Active

Built with ❤️ for anime enthusiasts worldwide
