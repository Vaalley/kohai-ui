# Kohai - Frontend Web Application

A modern web application for tagging movies and video games built with SvelteKit
and native CSS following atomic design principles.

Kohai is a web application that enables users to associate descriptive words
with movies and video games, creating a crowd-sourced tagging system. Users can
view aggregated popular tags for each piece of media, providing an organic,
community-driven description system.

## Technologies Used

- [SvelteKit](https://svelte.dev/) - Framework for building high-performance web
  applications
- Native CSS with atomic design organization
- [TMDB API](https://www.themoviedb.org/documentation/api) - For movie data
- [IGDB API](https://api-docs.igdb.com/) - For video game data

## Features

- User account creation and management
- Search for movies and video games
- Add descriptive tags (up to 3 per media)
- View most popular community tags for each media item
- Responsive design for all devices

## Project Structure

The project follows atomic design principles:

```text
src/
├── lib/
│   ├── components/
│   │   ├── atoms/       # Basic building blocks (buttons, inputs, tags)
│   │   ├── molecules/   # Groups of atoms (search bars, media cards)
│   │   ├── organisms/   # Groups of molecules (navigation, forms)
│   │   ├── templates/   # Page layouts
│   │   └── pages/       # Complete pages
│   └── utils/           # Helper functions
├── routes/              # SvelteKit pages
└── styles/              # Global styles, variables and reset
```

## How to Run

1. **Ensure Deno is installed:** If you haven't already, install Deno from
   [https://deno.com/](https://deno.com/).
2. **Clone the repository:** `git clone https://github.com/Vaalley/kohai-ui.git`
   and `cd kohai-ui`.
3. **Configure environment variables:** Copy the `.env.example` file to `.env`
   and update the values for API endpoints and keys.
4. **Install dependencies:** `deno install`
5. **Run the development server:** `deno task dev`

Open your browser: Navigate to `http://localhost:5173` to view the application.
