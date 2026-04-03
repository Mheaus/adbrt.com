# adbrt.com

My personal website — [adbrt.com](https://adbrt.com)

Built with [React Router v7](https://reactrouter.com/), [Vite](https://vite.dev/), and [Tailwind CSS v4](https://tailwindcss.com/).

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `pnpm dev`          | Start the development server |
| `pnpm build`        | Build for production         |
| `pnpm start`        | Start the production server  |
| `pnpm typecheck`    | Run TypeScript type checking |
| `pnpm lint`         | Lint with oxlint             |
| `pnpm lint:fix`     | Lint and auto-fix            |
| `pnpm format`       | Format with oxfmt            |
| `pnpm format:check` | Check formatting             |

## Docker

Build and run with Docker:

```bash
docker build -t adbrt.com .
docker run -p 3000:3000 adbrt.com
```
