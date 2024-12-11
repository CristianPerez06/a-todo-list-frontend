# a-todo-list-frontend

A modern todo list application with drag-and-drop functionality, real-time filtering, and a clean minimalist UI. Features include task creation, editing, reordering via drag-and-drop, and filtering capabilities.

## Tech stack

- Typescript
- React
- SASS
- react-beautiful-dnd
- react-toastify
- classnames
- heroicons/react
- Prettier, ESLint, and Husky

## Getting Started

### Prerequisites

Before running the development server, you need to set up your API URL.

**Set Environment Variables**

Create a `.env` file in the root directory and add:

```
REACT_APP_API_URL=your_api_url_here
```

### Development Server

Next step is to install dependencies and run the development server:

```bash
To run the application locally:

1. Install dependencies: `npm install`
2. Prepare Husky hooks: `npm run husky-prepare`
3. Start the development server: `npm start`
```

## Live Demo

A live version of this app is hosted on [Render](https://render.com/) (free tier). Please note:

- The app may take several seconds to start on first use, as the server may be sleeping.
- Performance may be limited during periods of high usage.

[View the live demo here](https://a-todo-list-frontend.onrender.com/)
