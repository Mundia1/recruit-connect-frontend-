# RecruitConnect

A modern and intuitive platform for connecting talented professionals with their dream jobs. This project provides a comprehensive user interface for both job seekers and employers, featuring a rich set of components for a seamless user experience.

Backend Deployment Link - https://recruitconnectbackend-jnuk.onrender.com/

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
- [Project Structure](#project-structure)
- [Component Library](#component-library)
  - [Navigation Components](#navigation-components)
  - [Form Components](#form-components)
  - [Button Components](#button-components)
  - [Data Display Components](#data-display-components)
  - [Layout Components](#layout-components)
  - [Content Components](#content-components)
  - [Interactive Components](#interactive-components)
  - [Specialized Components](#specialized-components)
  - [Utility Components](#utility-components)
- [Design System](#design-system)
  - [Color System](#color-system)
  - [Typography Scale](#typography-scale)
  - [Spacing Scale](#spacing-scale)
  - [Border Radius](#border-radius)
  - [Component Sizes](#component-sizes)
- [Pages/Screens Required](#pagesscreens-required)
- [Implementation Priority](#implementation-priority)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Mundia1/recruit-connect-frontend-.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd recruit-connect-frontend
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Project Structure

The project follows a standard React application structure:

```
/
├── public/              # Static assets
├── src/                 # Source code
│   ├── api/             # API-related logic
│   ├── assets/          # Images, icons, etc.
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Application pages
│   ├── styles/          # Global styles
│   └── utils/           # Utility functions
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
```

## Component Library

### Navigation Components

-   **Header/Navbar**: Main navigation bar with logo, menu, and user actions.
-   **Sidebar Navigation**: For admin panel with menu items and user profile.

### Form Components

-   **Input Field**: Standard text input with styling for different states.
-   **Search Input**: Input field with a search icon.
-   **Text Area**: For multi-line text input.
-   **Date Input**: For selecting dates.
-   **Rating Component**: A 1-5 star rating component.

### Button Components

-   **Primary Button**: For primary actions.
-   **Secondary Button**: For secondary actions.
-   **Icon Button**: A button that contains only an icon.

### Data Display Components

-   **Job Card**: Displays a summary of a job posting.
-   **Data Table**: For displaying tabular data.
-   **Status Badge**: To indicate status (e.g., "Full-time", "Interviewing").
-   **Statistics Card**: For displaying key metrics on the dashboard.
-   **Chart Components**: Bar and line charts for data visualization.

### Layout Components

-   **Hero Section**: Large introductory section at the top of the landing page.
-   **Featured Section**: For showcasing featured job listings.
-   **Dashboard Layout**: The main layout for the admin dashboard.

### Content Components

-   **Profile Card**: Displays user profile information.
-   **Message Item**: For displaying a message in a conversation.
-   **Application History Row**: A row in the application history table.

### Interactive Components

-   **Modal/Dialog**: For displaying content in a layer above the main page.
-   **Dropdown Menu**: A menu that appears when a user interacts with a button or other control.
-   **Tab Navigation**: For switching between different views.

### Specialized Components

-   **Job Post Form**: A form for creating or editing job posts.
-   **Analytics Dashboard**: The main dashboard for viewing analytics.
-   **Chat Interface**: The main interface for the chat feature.
-   **Settings Panel**: For managing user settings.

### Utility Components

-   **Icon Library**: A set of icons used throughout the application.
-   **Avatar Component**: For displaying user avatars.
-   **Divider/Separator**: For separating content.
-   **Loading/Empty States**: For indicating loading or empty states.

## Design System

### Color System

```css
/* Primary Green */
--green-primary: #21C259;
--green-dark: #05823B;
--green-darker: #12783D;

/* Light Green */
--green-light: #E8F2EB;
--green-light-alt: #E8F5ED;
--green-medium: #549469;

/* Secondary Green */
--green-secondary: #088729;
--green-muted: #4A9C6B;
--green-subtle: #4F946E;

/* Background */
--bg-primary: #F7FAFA;
--bg-secondary: #F7FCFA;

/* Text */
--text-primary: #0F1A12;
--text-secondary: #0D1C12;
--text-tertiary: #0D1C14;
--text-quaternary: #0D1C20;

/* Borders */
--border-light: #D1E5D9;
--border-medium: #E5E8EB;

/* Secondary Text */
--text-muted: #549469;
--text-subtle: #4F946E;
```

### Typography Scale

```css
/* Headings */
--text-3xl: 32px; /* Dashboard titles */
--text-2xl: 28px; /* Welcome messages */
--text-xl: 22px;  /* Section titles */
--text-lg: 18px;  /* Logo text */

/* Body */
--text-base: 16px; /* Primary text */
--text-sm: 14px;   /* Secondary text */
--text-xs: 13px;   /* Chart labels */

/* Line Heights */
--leading-normal: 150%;     /* Standard */
--leading-tight: 125-127%;  /* Headings */
```

### Spacing Scale

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;
--spacing-xl: 20px;
--spacing-2xl: 24px;
--spacing-3xl: 32px;
--spacing-4xl: 40px;
```

### Border Radius

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 20px;
--radius-full: 50%;
```

### Component Sizes

```css
/* Buttons */
--btn-sm: 40px height;
--btn-md: 48px height;

/* Avatars */
--avatar-sm: 40px;
--avatar-md: 56px;
--avatar-lg: 128px;

/* Icons */
--icon-sm: 16px;
--icon-md: 20px;
--icon-lg: 24px;
```

## Pages/Screens Required

1.  **Landing Page**
2.  **Sign In Page**
3.  **Sign Up Page**
4.  **Job Board**
5.  **Job Details**
6.  **Admin Dashboard**
7.  **Job Posting Form**
8.  **User Profile**
9.  **Messages/Chat**
10. **Application Feedback**
11. **Settings**

## Implementation Priority

### Phase 1: Foundation

-   Design system setup (colors, typography, spacing)
-   Basic components (Button, Input, Avatar, Icon)
-   Layout components (Header, Sidebar, Container)

### Phase 2: Core Components

-   Job Card, Data Table, Status Badge
-   Form components (all input types)
-   Navigation components

### Phase 3: Advanced Components

-   Charts and analytics
-   Chat interface
-   Modal/Dialog systems
-   Complex forms

### Phase 4: Page Assembly

-   Landing page
-   Dashboard layouts
-   User-facing pages
-   Admin interfaces

## Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in the development mode.
-   `npm run build`: Builds the app for production.
-   `npm run lint`: Lints the code.
-   `npm run preview`: Serves the production build locally.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
