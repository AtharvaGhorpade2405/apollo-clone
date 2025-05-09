# Apollo 247 Clone

A modern web application for booking doctor appointments, built with Next.js, TypeScript, and MongoDB.

## Features

- Doctor search and filtering
- Appointment booking system
- Responsive design
- Real-time availability checking
- User authentication (coming soon)

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- MongoDB Atlas
- Mongoose

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd apollo-clone/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Your API URL
- `MONGODB_URI`: MongoDB connection string

## Deployment

This project is configured for deployment on Vercel. The deployment process is automated through GitHub integration.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 