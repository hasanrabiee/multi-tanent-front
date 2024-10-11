#  Multi-Tenant Frontend (Next.js)

This repository contains the frontend built with **Next.js** for the Brink Multi-Tenant application. It is designed to work alongside the backend built with **Laravel**. The frontend handles tenant-specific features, user authentication, and post management through API interactions with the Laravel backend.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js (>=14.x)**
- **NPM/Yarn** (for managing frontend dependencies)

## Technologies Used

- **Next.js**: A React framework for building static and server-rendered web applications.
- **Tailwind CSS**: Utility-first CSS framework for designing a responsive UI.

## Features

### Multi-Tenancy

- Subdomain-based tenant management.
- Tenant-specific routing and API calls based on the tenant’s subdomain.

### Authentication

- Allows user registration and login under specific tenants.
- Admin roles can be assigned to users with specific permissions for managing tenant resources.

### Post Management

- Tenants can create, edit, and delete posts.
- Image uploads for posts are stored in tenant-specific folders on the backend.

### Rules

- Admins can create specific messages or promotions based on user locations.

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/hasanrabiee/frontendBrink.git
```

### Step 2: Install Dependencies

Use Yarn or NPM to install the frontend dependencies:

```bash
npm install
# or
yarn install
```

### Step 3: Run the Application

Start the Next.js development server:

```bash
npm run dev
# or
yarn dev
```

Your application will be running at `http://localhost:3000`.

## Usage

### Multi-Tenant

- Subdomains are used to manage different tenants.
- Tenants have their own posts, users, and resources.

### Authentication

- Users can register and log in to different tenant subdomains.
- Admin users can manage tenant resources.

### Post and Rule Management

- Manage tenant-specific posts and upload images to tenant-specific folders.
- Create rules that are based on user location and tenant.
