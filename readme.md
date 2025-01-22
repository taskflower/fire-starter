
# Wizard RAG System

## Project Description

This application is a platform for managing documents and categories through building wizards. The goal of the project is to create a tool that facilitates content and process organization in a mini-RAG (Retrieval-Augmented Generation) system, allowing users to manage knowledge and optimize document retrieval.

---

## Features

### 1. **Document Management**
- Create, edit, and delete documents.
- Assign documents to categories.
- Organize documents into a category structure.

### 2. **Categorization**
- Manage categories with a hierarchical tree structure.
- Create parent and child categories.

### 3. **Wizard Building**
- Create wizards defining process steps.
- Assign categories and documents to specific wizard steps.

### 4. **User Authentication**
- Firebase Authentication-based login system.
- Support for Google login.
- Protected access to the admin section.

### 5. **Layout and Navigation**
- Public interface for the homepage, about, and contact pages.
- Admin panel with a dashboard, document, category, and wizard management.

---

## Tech Stack

### Frontend
- **React**: Framework for building the user interface.
- **React Router**: Managing application routes.
- **Tailwind CSS**: Styling components.

### Backend
- **Firebase Firestore**: Storing documents, categories, and wizards.
- **Firebase Authentication**: Managing user authentication.

---

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository_url>
   cd <folder_name>
   ```

2. **Install Dependencies**
   Ensure you have Node.js (v16 or later) and npm installed.
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a project in Firebase.
   - Copy the project's configuration details and add them to the `.env` file:
     ```env
     VITE_FIREBASE_API_KEY=<YOUR_API_KEY>
     VITE_FIREBASE_AUTH_DOMAIN=<YOUR_AUTH_DOMAIN>
     VITE_FIREBASE_PROJECT_ID=<YOUR_PROJECT_ID>
     VITE_FIREBASE_STORAGE_BUCKET=<YOUR_STORAGE_BUCKET>
     VITE_FIREBASE_MESSAGING_SENDER_ID=<YOUR_MESSAGING_SENDER_ID>
     VITE_FIREBASE_APP_ID=<YOUR_APP_ID>
     VITE_FIREBASE_MEASUREMENT_ID=<YOUR_MEASUREMENT_ID>
     ```

4. **Run the Application**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

---

## Project Structure

```
src/
├── components/         # UI Components
├── firebase/           # Firebase Configuration
├── hooks/              # React Hooks
├── layouts/            # Page Layouts
├── pages/              # Application Pages
├── services/           # Firebase Logic
├── types/              # TypeScript Definitions
├── utils/              # Utility Functions
└── main.tsx            # Main Entry File
```

---

## Future Enhancements
- Implement full-text search in documents.
- Extend content analysis capabilities in wizards.
- Add advanced user permissions.

---

## License
This project is licensed under the MIT License.

---

## Author
- Name or nickname of the project author.

For inquiries, feel free to contact us.



npx shadcn@latest add button

firebase init
firebase deploy --only firestore:indexes