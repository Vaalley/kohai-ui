<div align="center">
  <h1>Kohai</h1>
  <p>A modern web application for tagging and discovering video games</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

</div>

## 🎮 About

Kohai is a web application that enables users to associate descriptive words with video games, creating a crowdsourced tagging system. Users can view aggregated
popular tags for each game, providing an organic, community-driven description system that helps in discovering games based on their unique characteristics.

## ✨ Features

- Secure authentication and profile management
- Activity history and contributions
- Search through thousands of video games
- Add up to 3 descriptive tags per game
- View tag popularity and trends
- Fully responsive layout for all devices

## 🚀 Technologies Used

- [SvelteKit](https://svelte.dev/) - Web framework
- [SCSS](https://sass-lang.com/) - Styling with CSS preprocessor
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [IGDB API](https://api-docs.igdb.com/) - Video game database
- [Deno](https://deno.com/) - JavaScript/TypeScript runtime

## 📁 Project Structure

The project follows atomic design principles for component organization:

```
src/
├── lib/
│   ├── components/      # Reusable UI components (organized with atomic design principles)
│   ├── stores.svelte.ts # Svelte stores for state management
│   ├── utils.ts         # Helper functions and utilities
│   └── types.ts         # TypeScript type definitions
├── routes/              # Application routes and pages
├── static/              # Static assets (images, fonts)
└── styles/              # Global styles and design tokens
```

## 🛠️ Getting Started

### Prerequisites

- [Deno](https://deno.com/) (v2.x)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vaalley/kohai-ui.git
   cd kohai-ui
   ```

2. **Install dependencies**
   ```bash
   deno install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   deno task dev
   ```

5. **Open in browser** Navigate to `http://localhost:5173`

## 📜 Available Scripts

- `deno task dev` - Start development server
- `deno task tidy` - Run linter, formatter
- `deno task check` - Type checking

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

- GitHub: [@Vaalley](https://github.com/Vaalley)
- Project Link: [https://github.com/Vaalley/kohai-ui](https://github.com/Vaalley/kohai-ui)

## 🌟 Acknowledgments

- Built with ❤️ using [SvelteKit](https://svelte.dev/)
- Game data provided by [IGDB](https://api-docs.igdb.com/)
- Iconography provided by [Lucide](https://lucide.dev/)
- Toast notifications provided by [Svelte Sonner](https://github.com/wobsoriano/svelte-sonner)

---

<div align="center">
  Made with &hearts; by the Kohai Team
</div>
