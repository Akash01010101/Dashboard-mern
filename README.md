# Frontend for Social Media Submission System

This repository contains the frontend code for the Social Media Submission System. The application allows users to submit their name, social media handle, and multiple images. Administrators can view all submissions on a protected dashboard.

## Features

### User Submission Form
- Users can input their name and social media handle.
- Users can upload multiple images.
- Submission data is sent to the backend using a REST API.

### Admin Dashboard
- Displays all submissions, including:
  - Name
  - Social Media Handle
  - Uploaded images
- Protects access with authentication.
- Displays images in a responsive grid format with a hover overlay to view full images.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Axios**: For making HTTP requests to the backend API.
- **Tailwind CSS**: For styling the components.

## Prerequisites

- Node.js (version 16 or later)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/frontend-social-media.git
   ```

2. Navigate to the project directory:
   ```bash
   cd frontend-social-media
   ```

3. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

## Usage

### Development Server

1. Start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

