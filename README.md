# 📚 Book Archive

This is my final React project for HackerU's Fullstack course. The goal of the project was to build a Single Page Application (SPA) for managing a personal book collection, implementing full CRUD operations and working with an external API.

The project was designed, implemented, and tested by me, with modern development tools used where appropriate.

## ✨ Project Requirements & Features

The following features were defined in the project brief and implemented as part of the assignment:

* [x] Display book catalog as cards
* [x] Add new books
* [x] Edit book details
* [x] Delete books
* [x] Toggle favorite status
* [x] Search / filter books by title
* [x] Responsive design
* [x] Loading states
* [x] Error handling

## 🚀 Tech Stack

### Runtime & Build Tools

* **React 18** – UI library
* **Vite** – Build tool and development server
* **Tailwind CSS** – Utility-first CSS framework
* **Flowbite React** – UI component library

### Backend (Mocked)

* **MockAPI.io** – Mock REST API used for data persistence

### Development Tools

* **ESLint** – Code linting and consistency
* **PostCSS** – CSS processing for Tailwind

## 🤖 AI Assistance & Development Notes

During development, I used an LLM (Claude Sonnet 4.5) as a **development aid**, primarily to:

* Help debug specific issues
* Refine and refactor existing code
* Improve readability and structure
* Validate approaches against best practices

All architectural decisions, implementation choices, and final code were reviewed, adapted, and integrated by me. The LLM was used as a support tool, not as a one-shot code generator.

## 📋 Prerequisites

To run this project locally, you will need:

* Node.js (v16 or higher)
* npm or yarn
* A free MockAPI.io account (for backend simulation)

## ⚙️ Project Setup & Running Locally

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
   npm run dev
   ```
4. Open the local URL provided by Vite in your browser

> Note: For simplicity, the MockAPI endpoint is currently defined directly in the service layer. In a production setting, this would typically be handled via environment variables.

## 📁 Project Structure

The following structure reflects the intended organization of the project. Some files are omitted for brevity.

```
book-archive/
│
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS + Flowbite config
├── postcss.config.js         # PostCSS configuration
├── .eslintrc.cjs             # ESLint rules
├── .gitignore                # Git ignore rules
├── README.md                 # Project documentation
├── index.html                # HTML entry point
│
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Main app component
    ├── index.css             # Global styles + Tailwind
    │
    ├── components/           # Reusable React components
    │   ├── BookCard.jsx
    │   ├── BookForm.jsx
    │   └── SearchBar.jsx
    │
    └── services/             # API service layer
        └── bookService.js
```

## 🛠️ Development Process

After reviewing the project instructions, I broke the work into the following stages:

### Step 1: MockAPI Backend Setup

* Created a MockAPI project with a `books` resource
* Defined schema:

```json
{
  "id": "auto-generated",
  "title": "string",
  "author": "string",
  "description": "string",
  "coverImage": "string",
  "isFavorite": "boolean (default: false)"
}
```

### Step 2: Project Initialization

* Created React project using Vite
* Installed and configured Tailwind CSS and Flowbite

### Step 3: API Service Layer

* Implemented GET, POST, PUT, and DELETE requests
* Centralized API logic in a service module

### Step 4: Component Development

* BookCard: reusable display component
* BookForm: modal-based add/edit form
* SearchBar: real-time filtering input

### Step 5: Application Logic

* State management in the main App component
* Connected UI components to API operations

### Step 6: Styling & Responsiveness

* Responsive grid layout
* Hover states and transitions

### Step 7: Testing

Manually tested the following flows:

* Add new book
* Edit existing book
* Delete book
* Toggle favorite status
* Search and filter behavior
* Mobile responsiveness

## 🐞 Known Issues & Future Improvements

* Initial implementation of the search filter contained a logic issue that was later identified and corrected
* Images initially offset the layout. This was corrected by wrapping the card images in a div with a fixed height (h-64). Initially, using object-cover caused some images to be cropped, so this was updated to object-contain to ensure the entire image is visible while maintaining a consistent card height.
* Authentication and user-specific collections are not implemented
* Pagination and sorting could be added for larger datasets

## 📚 Useful Resources

* [React Documentation](https://react.dev/)
* [Vite Documentation](https://vitejs.dev/)
* [Tailwind CSS Documentation](https://tailwindcss.com/)
* [Flowbite React Components](https://flowbite-react.com/)
* [MockAPI.io Documentation](https://mockapi.io/docs)

## 🤝 Contributing

This is a student project created as part of a Fullstack course. Feel free to fork and experiment with it.

## 📄 License

MIT

---

Happy coding 🚀
