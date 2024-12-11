# Admin UI for TelLeak ISP

This is the admin UI for TelLeak ISP. It provides a web interface for managing the ISP's services.

## Features

- User authentication and authorization
- Dashboard with security metrics
- User management
- File management
- Session management

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

## Docker Setup

```bash
# Build and start containers
docker-compose build
docker-compose up -d
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
PORT=3000
JWT_SECRET=your_jwt_secret
DB_HOST=db
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=admin_ui
REDIS_HOST=redis
REDIS_PORT=6379
```

## Project Structure

```
admin-ui/
├── src/
│   ├── components/     # React components
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Express middleware
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── types/         # TypeScript types
│   └── utils/         # Utility functions
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/logout` - User logout

### User Management
- `GET /api/users` - List users
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### File Management
- `GET /api/files` - List files
- `GET /api/files/:id` - Get file details
- `POST /api/files` - Upload file
- `DELETE /api/files/:id` - Delete file

## Security Features

The application includes several security features:

1. JWT-based authentication
2. Password hashing
3. Rate limiting
4. CORS protection
5. Input validation
6. Error handling
7. Secure session management

## Development

```bash
# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## License

This project is licensed under the MIT License. 