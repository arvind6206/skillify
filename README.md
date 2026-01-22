# Skillify - Learning Management System

A comprehensive Learning Management System (LMS) built with React and Node.js, designed to provide a seamless learning experience for students, instructors, and administrators.

## 🚀 Features

### For Students
- **Browse Courses**: Discover and explore available courses with search and filter functionality
- **Course Details**: View detailed course information including description, instructor, and learning outcomes
- **Enrollment**: Enroll in courses with a single click
- **My Courses**: Track all enrolled courses in one place
- **Search & Filter**: Find courses by title, description, instructor, or category
- **User Profile**: Manage personal information and view account details

### For Instructors
- **Course Management**: Create, edit, and publish courses
- **Enhanced Course Creation**: Add categories, levels, duration, and learning outcomes
- **Dashboard Analytics**: View statistics including total students, earnings, ratings, and published courses
- **Course Organization**: Organize courses by status (Published/Draft)
- **Instructor Approval**: Wait for admin approval before creating courses

### For Administrators
- **User Management**: View all users (students, instructors, admins)
- **Instructor Approval**: Approve or reject instructor applications
- **Platform Statistics**: View comprehensive platform statistics
- **User Overview**: Monitor user activity and status

## 🎨 User-Friendly Improvements

### Enhanced UI/UX
- **Modern Design**: Beautiful, responsive design with Tailwind CSS
- **Loading States**: Smooth loading indicators throughout the application
- **Error Handling**: Comprehensive error messages and validation
- **Password Visibility Toggle**: Show/hide password for better user experience
- **Responsive Layout**: Mobile-friendly design that works on all devices
- **Improved Navigation**: Easy navigation with breadcrumbs and clear routes

### Course Features
- **Course Categories**: Organize courses by categories
- **Course Levels**: Beginner, Intermediate, and Advanced levels
- **Learning Outcomes**: Clear learning objectives for each course
- **Course Duration**: Estimated time to complete
- **Enhanced Course Cards**: Beautiful course cards with hover effects and better information display

### Search & Discovery
- **Real-time Search**: Search courses by title, description, or instructor
- **Category Filtering**: Filter courses by category
- **Results Count**: See how many courses match your search

### Authentication
- **Secure Login/Register**: JWT-based authentication
- **Password Strength**: Minimum 6 characters requirement
- **Role-based Access**: Different dashboards for students, instructors, and admins
- **Form Validation**: Client-side validation with helpful error messages

## 📁 Project Structure

```
Skillify/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── context/       # React context
│   │   ├── layouts/       # Layout components
│   │   └── utils/         # Utility functions
│   └── package.json
│
└── server/                 # Node.js backend
    ├── src/
    │   ├── controllers/   # Route controllers
    │   ├── models/        # Database models
    │   ├── routes/        # API routes
    │   ├── middlewares/   # Custom middlewares
    │   └── config/        # Configuration files
    └── package.json
```

## 🛠️ Technology Stack

### Frontend
- React 19.2.0
- React Router DOM 7.12.0
- Tailwind CSS 4.1.18
- React Icons 5.5.0
- Vite 7.2.4

### Backend
- Node.js
- Express 5.2.1
- MongoDB with Mongoose 9.1.4
- JWT (jsonwebtoken 9.0.3)
- bcryptjs 3.0.3

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Skillify
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**

   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

5. **Start the development servers**

   In the `server` directory:
   ```bash
   npm start
   ```

   In the `client` directory (new terminal):
   ```bash
   npm run dev
   ```

## 🎯 Usage

### Student Workflow
1. Register/Login as a student
2. Browse available courses on the dashboard
3. Use search and filters to find courses
4. Click on a course to view details
5. Enroll in courses
6. Access enrolled courses from "My Courses"

### Instructor Workflow
1. Register as an instructor
2. Wait for admin approval
3. Once approved, create courses
4. Add course details (title, description, category, level, etc.)
5. Publish courses for students to enroll
6. View analytics and manage courses

### Admin Workflow
1. Login as admin
2. View platform statistics
3. Approve pending instructors
4. Monitor all users and their activities

## 🔐 User Roles

- **Student**: Can browse, search, and enroll in courses
- **Instructor**: Can create and manage courses (after approval)
- **Admin**: Can manage users and approve instructors

## 🎨 Key Improvements Made

1. ✅ **Course Details Page**: Full course information with enrollment functionality
2. ✅ **Search & Filter**: Real-time search and category filtering
3. ✅ **My Courses Page**: Students can view all enrolled courses
4. ✅ **Enhanced Admin Dashboard**: Comprehensive user and instructor management
5. ✅ **Course Categories**: Organize courses by categories
6. ✅ **Improved Forms**: Password visibility toggle, better validation
7. ✅ **User Profile**: Profile page for managing account information
8. ✅ **Better Course Cards**: Enhanced UI with hover effects and more information
9. ✅ **Loading States**: Smooth loading indicators throughout
10. ✅ **Error Handling**: Comprehensive error messages and validation

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Courses
- `GET /api/courses` - Get all published courses
- `GET /api/courses/:id` - Get course by ID
- `GET /api/courses/mine` - Get instructor's courses
- `POST /api/courses` - Create new course (instructor only)
- `PUT /api/courses/:id` - Update course (instructor only)
- `DELETE /api/courses/:id` - Delete course (instructor only)

### Enrollments
- `POST /api/enrollments/:courseId` - Enroll in course (student only)
- `GET /api/enrollments/my-courses` - Get student's enrollments
- `GET /api/enrollments/check/:courseId` - Check enrollment status

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/pending-instructors` - Get pending instructors (admin only)
- `PUT /api/admin/approve-instructor/:id` - Approve instructor (admin only)

## 🚧 Future Enhancements

- [ ] Course reviews and ratings system
- [ ] Lesson management and video playback
- [ ] Progress tracking for students
- [ ] Certificate generation
- [ ] Payment integration
- [ ] Email notifications
- [ ] Discussion forums
- [ ] Assignment submission
- [ ] Live chat support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Skillify Development Team

---

**Note**: Make sure to set up your MongoDB connection string and JWT secret in the environment variables before running the application.
