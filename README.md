# React

A modern React-based project utilizing the latest frontend technologies and tools for building responsive web applications.

## 🚀 Features

- **React 18** - React version with improved rendering and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Redux Toolkit** - State management with simplified Redux setup
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router v6** - Declarative routing for React applications
- **Data Visualization** - Integrated D3.js and Recharts for powerful data visualization
- **Form Management** - React Hook Form for efficient form handling
- **Animation** - Framer Motion for smooth UI animations
- **Testing** - Jest and React Testing Library setup
- **Notifications** - In-app bell dropdown and `/notifications` page

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

## 🛠️ Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
   
2. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## 📁 Project Structure

```
react_app/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   │   └── notifications/  # Notifications page
│   ├── services/       # API/service layer (incl. notificationService)
│   ├── styles/         # Global styles and Tailwind configuration
│   ├── App.jsx         # Main application component
│   ├── Routes.jsx      # Application routes
│   └── index.jsx       # Application entry point
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

## 🔔 Notifications

- Service: `src/services/notificationService.js` (mock by default, Supabase-ready)
- UI: `src/components/ui/NotificationIndicator.jsx`
- Page: `src/Pages/notifications/index.jsx` at route `/notifications`

Suggested Supabase schema:

```
create table notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null,
  title text not null,
  message text not null,
  type text default 'system',
  priority text default 'info',
  read boolean default false,
  created_at timestamp with time zone default now()
);
```

Update the queries in `notificationService.js` to use Supabase when ready and optionally enable Realtime subscriptions.

## 🗄️ Supabase Schema & RLS

- Apply SQL: open the Supabase SQL editor and run the contents of `supabase/schema.sql`.
- This creates tables: `users`, `conversations`, `messages`, `notifications` and adds RLS policies.
- After applying, enable Realtime for the `public.notifications` table from the Supabase dashboard.

## ✉️ Tenant Invitations (Edge Function)

Deploy function (requires Supabase CLI):

```bash
supabase functions deploy invite-tenant
supabase secrets set --env-file ./supabase/.functions.env # must include SUPABASE_SERVICE_ROLE_KEY
```

Function expects env:

```
SUPABASE_URL=https://ducyompeclwhecrcpjir.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...service role key...
```

Frontend calls:

```js
const { data, error } = await supabase.functions.invoke('invite-tenant', { body: { email, unitId } })
```

Schema supports linking invitations to units (`invitations.unit_id`) and auto-links the tenant on signup.

## 👤 Landlord Login & Profile

- Login route: `/landlord-login`
- Profile route: `/profile`

## 🧩 Adding Routes

To add new routes to the application, update the `Routes.jsx` file:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    // Add more routes as needed
  ]);

  return element;
};
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration includes:

- Forms plugin for form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints.


## 📦 Deployment

Build the application for production:

```bash
npm run build
```

## 🙏 Acknowledgments

- Powered by React and Vite
- Styled with Tailwind CSS

Built with ❤️ on Rocket.new
