# RPS Front End Developer Technical Task

Thank you for the assignment! Below is an overview of the completed task.

## 🎯 What We Have Done

We built a modern, production-ready **React + TypeScript + Tailwind CSS** application that strictly fulfills all prompt requirements:

1. **Merged Design & Functionality:** 
   - We implemented the *functionality* of the second image: a robust, dark-themed modal overlay featuring a scrollable comment area and a clean "Comment" header with a close button.
   - We implemented the *design* of the first image: the comments inside the modal strictly follow the white-card layout requested, matching the specific fields, typography, and button styles.
2. **State Management:**
   - **Initial State**: Handled by `CommentForm.tsx`. Fields are empty, but the `Current value` is displayed.
   - **Editing State**: Automatically transitions as the user begins typing.
   - **Submitted State**: Handled by `CommentCard.tsx` when submitted, rendering the static data, mock PDF styling, and dynamic action buttons.
3. **Tech Stack**: Strict typing with TypeScript, component-based architecture with React Hooks, and completely custom utility-class styling with Tailwind.

## 🚀 How to Run This

This project uses Vite for lightning-fast development. 

1. Ensure you have **Node.js** installed on your machine.
2. Open your terminal in this project directory.
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to the localhost URL provided in the terminal (usually `http://localhost:5173/`) to view and interact with the component.

---

## 🎥 AI Coding Tool Demo

As requested in the interview instructions, this project was developed with the assistance of an AI coding agent. 

Here is a video demo verifying the implementation and testing the specific white-card UI state transitions:

![AI Component Demo Video](./demo.webp)

*(Note: The video demonstrates how the UI strictly merges the dark-modal functionality with the white-card form structure as requested).*
