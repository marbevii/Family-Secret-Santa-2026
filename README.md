# Family Secret Santa 2026

### A little secret, a lot of Christmas magic.

A festive, interactive Secret Santa web application created as a personal learning project and a fun way to bring family members together during the Christmas season.

Built with **Next.js, React, TypeScript, and Tailwind CSS**, this project combines web development, responsive design, interactive animations and server-side logic to create a personalized Christmas experience.

---

## About the Project

**Family Secret Santa 2026** is a web application that allows family members to discover their assigned Secret Santa recipient using a private code.

Instead of simply receiving a name in a message, participants enter a festive digital experience featuring a snowy Christmas village, animated chimney smoke, background music and a magical gift-opening animation.

Once a valid code is submitted, a personalized Christmas letter reveals the recipient.

The project was created primarily **to practice, experiment with and learn modern web development technologies** while building something meaningful for family and friends.

It is a personal, non-commercial project and is not intended to operate as a commercial Secret Santa service.

## Features

- **Interactive Christmas village:** A festive 3D-style illustrated scene with warm lights and snowy houses.
- **Animated snowfall:** Decorative snowflakes falling across the page.
- **Animated chimney smoke:** CSS animations synchronized with the Christmas village illustration.
- **Secret code verification:** Each participant uses a private code to discover their assigned recipient.
- **Server-side validation:** Secret codes are validated through a Next.js API endpoint.
- **Magical gift animation:** A Christmas present opens to reveal a personalized letter.
- **Christmas background music:** Festive audio playback, subject to browser autoplay restrictions.
- **Responsive design:** Adapted for desktop and mobile devices.
- **Social sharing metadata:** Open Graph metadata for link previews.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework and server-side functionality |
| React | Interactive user interface |
| TypeScript | Type-safe application development |
| Tailwind CSS | Styling infrastructure |
| CSS3 | Custom layouts, animations, and responsive design |
| Next.js API Routes | Server-side code validation |
| Vercel | Deployment and hosting |
| Git & GitHub | Version control and source code management |

## 📁 Project Structure

```text
Family-Secret-Santa-2026/
├── public/
│   ├── christmas-village.png
│   ├── floc-neu-nadal.png
│   └── ...
├── src/
│   └── app/
│       ├── api/
│       │   └── reveal/
│       ├── ChristmasMusic.tsx
│       ├── globals.css
│       ├── icon.png
│       ├── layout.tsx
│       └── page.tsx
├── private/                 # Local private data (not committed)
├── .env.local               # Local environment variables
├── package.json
└── README.md
```

The private data directory and local environment variables must never be committed to a public repository.

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/marbevii/Family-Secret-Santa-2026.git
cd Family-Secret-Santa-2026
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Important:** The public source code alone may not provide a fully functional Secret Santa experience. Private configuration and assignment data are required for recipient verification and are intentionally excluded from the repository.

## Privacy and Security

The application is designed to keep Secret Santa assignments private.

- Participants use individual secret codes.
- Code verification is handled server-side.
- Private assignments are not intentionally exposed through the frontend.
- Sensitive configuration and assignment data must remain outside the public repository.
- The application does not require participants to create an account.

This project is intended for a small family activity and should not be treated as a production-grade authentication or identity management system.

For any public deployment, additional security reviews, appropriate access controls and rate limiting should be considered.

## Music and Copyright Notice

### Background Music

The application has been developed and locally tested with the following song:

**“All I Want for Christmas Is You” — Mariah Carey**

The song and its sound recording are copyrighted works belonging to their respective rights holders.

### Copyright Disclaimer

This project is an independent, non-commercial, educational web development project.

The developer does not claim ownership of, authorship of, or any rights to the song, its composition, lyrics, master recording, or associated artwork.

The use of the song is intended solely to create a festive atmosphere during development and personal testing.

**Important legal considerations:**

1. **No ownership claim:** All rights to the musical composition and sound recording remain with their respective copyright holders.
2. **Educational purpose is not a license:** The project's educational, personal, or non-commercial nature does not automatically authorize copying, hosting, distributing, or publicly performing copyrighted music.
3. **Separate rights may apply:** Musical compositions and sound recordings can have different copyright owners and licensing requirements.
4. **Public deployment:** Hosting or streaming the original recording from a publicly accessible website may require appropriate permissions or licenses from the relevant rights holders.
5. **No redistribution:** This repository is not intended to distribute copyrighted audio recordings or grant third parties permission to use them.
6. **Third-party rights:** Any music, illustrations, fonts, or other third-party assets remain subject to their respective licenses and copyright terms.

### Audio File Availability

The copyrighted commercial audio recording is **not intended to be included in the public GitHub repository**.

The application references a local audio file at:

```text
public/musica-nadal.mp3
```

This path is used for development purposes and does not imply that the audio file is freely licensed or authorized for public distribution.

For a publicly deployed version, the commercial recording should be removed or replaced with appropriately licensed music unless the necessary permissions have been obtained.

### Browser Autoplay Restrictions

The application attempts to play background music automatically.

However, modern browsers may prevent audio playback until a user interacts with the page.

This behavior is controlled by browser autoplay policies and cannot be guaranteed by the application.

For additional information, see the [MDN Autoplay Guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay).

## Visual Assets

The application includes festive illustrations, decorative elements, and custom animations.

The Christmas village uses a 3D-inspired visual aesthetic, while snowfall, chimney smoke, and gift-opening effects are implemented through web technologies.

Ownership and usage rights for individual visual assets depend on their original source and applicable licensing terms.

No ownership of third-party assets is implied.

## Learning Objectives

This project was created to develop practical experience in:

- Building applications with Next.js and React.
- Writing reusable components with TypeScript.
- Designing responsive interfaces for mobile and desktop.
- Creating CSS animations and interactive visual effects.
- Handling forms, asynchronous requests, and application state.
- Developing and connecting server-side API endpoints.
- Working with private configuration and sensitive data.
- Understanding browser media playback restrictions.
- Deploying and maintaining web applications with GitHub and Vercel.
- Learning about copyright and responsible third-party asset usage.

Beyond its technical aspects, the project is an opportunity to explore how web development can turn a simple family tradition into a memorable digital experience.

## Disclaimer

This project is provided for personal learning, experimentation, and demonstration purposes.

It is not affiliated with, endorsed by, or sponsored by Mariah Carey, her record label, music publishers, or any other third-party rights holders.

The developer makes no representation that third-party materials are licensed for public reuse.

Anyone adapting or deploying this project is responsible for ensuring that their use of third-party assets complies with applicable laws and license agreements.

## Final Note

What started as a small idea to make our family's Secret Santa a little more special became a creative opportunity to learn, experiment, and build something from scratch.

This project is a reminder that programming is not just about writing code. It is also about creating experiences, solving problems, and bringing ideas to life.

**Made with love, curiosity and a little Christmas magic.**

*Christmas 2026* 
