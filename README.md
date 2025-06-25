# 🍽️ Restaurant Management System

A comprehensive restaurant management system built with **NestJS**, **GraphQL**, **TypeORM**, **MySQL**, and **Swagger**.

## 🚀 Features

- **GraphQL API** with Apollo Server
- **REST API** with Swagger documentation
- **MySQL Database** with TypeORM
- **Real-time** GraphQL subscriptions
- **Complete Restaurant Management**:
  - Menu management (categories, items, pricing)
  - Order processing and tracking
  - Table management
  - Staff management
  - Customer management
  - Inventory tracking

## 🛠️ Technologies Used

- **Backend Framework**: NestJS
- **Database**: MySQL
- **ORM**: TypeORM
- **GraphQL**: Apollo Server
- **API Documentation**: Swagger/OpenAPI
- **Validation**: class-validator
- **Environment**: Node.js + TypeScript

## 📋 Prerequisites

- Node.js (v16 or higher)
- MySQL (v8 or higher)
- Yarn or npm

## ⚡ Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd service-webb
yarn install
```

### 2. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE restaurant_db;
```

### 3. Environment Configuration

Update the `.env` file with your database credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=restaurant_db

# Application Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration (for future authentication)
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
```

### 4. Start the Application

```bash
# Development mode
yarn start:dev

# Production mode
yarn build
yarn start:prod
```

The application will be running on:

- **Main App**: http://localhost:3000
- **GraphQL Playground**: http://localhost:3000/graphql
- **Swagger Documentation**: http://localhost:3000/api

## 🎯 API Endpoints

### REST Endpoints

#### Categories

- `GET /categories` - Get all categories
- `GET /categories/active` - Get active categories
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Create new category
- `PATCH /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

### GraphQL Queries & Mutations

#### Categories

**Queries:**

```graphql
# Get all categories
query {
  categories {
    id
    name
    description
    imageUrl
    isActive
    menuItems {
      id
      name
      price
    }
  }
}

# Get category by ID
query {
  category(id: "uuid-here") {
    id
    name
    description
    menuItems {
      id
      name
      price
      status
    }
  }
}
```

**Mutations:**

```graphql
# Create category
mutation {
  createCategory(
    createCategoryInput: {
      name: "Appetizers"
      description: "Delicious starters"
      imageUrl: "https://example.com/appetizers.jpg"
    }
  ) {
    id
    name
    description
  }
}

# Update category
mutation {
  updateCategory(
    id: "uuid-here"
    updateCategoryInput: { name: "Updated Appetizers", isActive: true }
  ) {
    id
    name
    isActive
  }
}
```

#### Menu Items

**Queries:**

```graphql
# Get all menu items
query {
  menuItems {
    id
    name
    description
    price
    preparationTime
    status
    category {
      name
    }
  }
}

# Get menu items by category
query {
  menuItemsByCategory(categoryId: "uuid-here") {
    id
    name
    price
    description
  }
}

# Search menu items
query {
  searchMenuItems(searchTerm: "salmon") {
    id
    name
    description
    price
  }
}
```

**Mutations:**

```graphql
# Create menu item
mutation {
  createMenuItem(
    createMenuItemInput: {
      name: "Grilled Salmon"
      description: "Fresh Atlantic salmon"
      price: 24.99
      categoryId: "uuid-here"
      preparationTime: 20
      status: AVAILABLE
    }
  ) {
    id
    name
    price
  }
}
```

## 🗃️ Database Schema

### Core Entities

1. **Categories** - Menu categories (Appetizers, Main Courses, etc.)
2. **MenuItems** - Individual menu items with pricing and details
3. **Orders** - Customer orders with status tracking
4. **OrderItems** - Junction table for order-menu item relationships
5. **Tables** - Restaurant table management
6. **Staff** - Employee management
7. **Customers** - Customer information and history

### Entity Relationships

```
Category (1) -> (N) MenuItem
Order (1) -> (N) OrderItem
MenuItem (1) -> (N) OrderItem
Customer (1) -> (N) Order
Table (1) -> (N) Order
Staff (1) -> (N) Order (as server)
```

## 🔧 Development

### Database Seeding

To populate the database with sample data:

```typescript
// This is a conceptual example - you can implement a seeder command
import { DatabaseSeeder } from './src/seeds/database.seed';

// Run the seeder to populate with sample data:
// - Categories (Appetizers, Main Courses, Desserts, Beverages)
// - Menu Items (Various dishes and drinks)
// - Tables (8 tables with different capacities)
// - Staff (Manager, Waiters, Chef)
// - Customers (Sample customer profiles)
```

### Project Structure

```
src/
├── entities/           # TypeORM entities
│   ├── base.entity.ts
│   ├── category.entity.ts
│   ├── menu-item.entity.ts
│   ├── order.entity.ts
│   ├── order-item.entity.ts
│   ├── table.entity.ts
│   ├── staff.entity.ts
│   └── customer.entity.ts
├── modules/            # Feature modules
│   ├── category/
│   ├── menu/
│   ├── order/
│   ├── table/
│   ├── staff/
│   └── customer/
├── dto/                # Data Transfer Objects
└── seeds/              # Database seeders
```

## 📱 Example Use Cases

### 1. Restaurant Menu Management

- Create categories and menu items
- Update pricing and availability
- Track preparation times

### 2. Order Processing

- Place orders for dine-in, takeaway, or delivery
- Track order status from pending to completed
- Calculate totals with tax and tips

### 3. Table Management

- Track table availability and capacity
- Assign tables to orders
- Manage reservations

### 4. Staff Management

- Manage employee information
- Track roles and hourly rates
- Assign servers to orders

## 🔮 Future Enhancements

- [ ] **Authentication & Authorization** (JWT-based)
- [ ] **Real-time Order Updates** (WebSocket subscriptions)
- [ ] **Payment Integration** (Stripe, PayPal)
- [ ] **Inventory Management** (Stock tracking)
- [ ] **Reporting & Analytics** (Sales reports, popular items)
- [ ] **Multi-location Support** (Restaurant chains)
- [ ] **Mobile App API** (React Native/Flutter support)
- [ ] **Kitchen Display System** (Real-time order tracking)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

### 🎓 Academic Project Notes

This project demonstrates:

- **Modern Backend Architecture** with NestJS
- **Database Design** with proper relationships and constraints
- **API Design** with both REST and GraphQL approaches
- **Documentation** with Swagger and GraphQL introspection
- **Type Safety** with TypeScript throughout
- **Validation** with class-validator decorators
- **Clean Code** with proper separation of concerns

Perfect for learning modern web development practices and building portfolio projects!
