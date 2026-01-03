# JWT Authentication Web App

A professional, accessible web application for user authentication using JWT tokens, built with pure HTML5, CSS3, and JavaScript.

## Features

- User registration and login
- JWT-based authentication
- Protected routes
- Responsive design following modern UI/UX trends
- Accessibility compliance (WCAG guidelines)
- Client-side form validation
- Secure token storage in localStorage

## Setup

1. Ensure Node.js and npm are installed.
2. Install dependencies: `npm install`
3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add `JWT_SECRET=your_secret_key_here`
4. Start the server: `npm start` or `node index.js`
5. Open `index.html` in your browser to access the login page.

## Usage

- **Login**: Navigate to `index.html`, enter credentials, and submit.
- **Register**: Go to `register.html` to create a new account.
- **Protected Content**: After login, access `protected.html` to view secured content.
- **Logout**: Click the logout button on the protected page.

## Files

- `index.html`: Login page
- `register.html`: Registration page
- `protected.html`: Protected content page
- `style.css`: Modern, responsive styles
- `script.js`: Client-side JavaScript for forms and API calls
- `index.js`: Express server (backend)
- `middleware/authenticateToken.js`: JWT middleware
- `routes/`: API route handlers

## Accessibility

This app follows accessibility best practices:
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast support
- Screen reader friendly

## Troubleshooting

- **Login/Register fails**: Check server is running on port 8000 and `.env` is configured.
- **Token errors**: Ensure JWT_SECRET is set and tokens aren't expired.
- **Styling issues**: Clear browser cache or check CSS file paths.
- **Network errors**: Verify backend endpoints match client requests.

## Security Notes

- Tokens are stored in localStorage (not secure for production).
- Use HTTPS in production.
- Implement proper password hashing on the server side.
