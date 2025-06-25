# 🚀 Development Guide

## Setup Steps

### 1. Install Dependencies

```bash
yarn install
```

### 2. Database Setup

Make sure MySQL is running and create the database:

```sql
CREATE DATABASE restaurant_db;
```

### 3. Environment Configuration

Update `.env` file with your database credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=restaurant_db
```

### 4. Start Development Server

```bash
yarn start:dev
```

### 5. Seed Database (Optional)

Populate the database with sample data:

```bash
yarn seed
```

## 🔗 Access Points

- **Application**: http://localhost:3000
- **GraphQL Playground**: http://localhost:3000/graphql
- **Swagger API Documentation**: http://localhost:3000/api

## 🧪 Testing the APIs

### REST API Examples

#### Create a Category

```bash
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Appetizers",
    "description": "Delicious starters",
    "imageUrl": "https://example.com/appetizers.jpg"
  }'
```

#### Get All Categories

```bash
curl http://localhost:3000/categories
```

#### Get Category by ID

```bash
curl http://localhost:3000/categories/{category-id}
```

### GraphQL Examples

#### Create Category (GraphQL)

```graphql
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
    isActive
    createdAt
  }
}
```

#### Get All Categories with Menu Items

```graphql
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
      description
      price
      preparationTime
      status
    }
  }
}
```

#### Create Menu Item

```graphql
mutation {
  createMenuItem(
    createMenuItemInput: {
      name: "Grilled Salmon"
      description: "Fresh Atlantic salmon grilled to perfection"
      price: 24.99
      categoryId: "your-category-id-here"
      preparationTime: 20
      status: AVAILABLE
    }
  ) {
    id
    name
    price
    category {
      name
    }
  }
}
```

#### Search Menu Items

```graphql
query {
  searchMenuItems(searchTerm: "salmon") {
    id
    name
    description
    price
    category {
      name
    }
  }
}
```

#### Get Available Menu Items

```graphql
query {
  availableMenuItems {
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
```

## 📁 Project Structure

```
src/
├── entities/              # TypeORM entities
│   ├── base.entity.ts     # Base entity with common fields
│   ├── category.entity.ts # Menu categories
│   ├── menu-item.entity.ts # Menu items
│   ├── order.entity.ts    # Orders
│   ├── order-item.entity.ts # Order items (junction)
│   ├── table.entity.ts    # Restaurant tables
│   ├── staff.entity.ts    # Staff/employees
│   └── customer.entity.ts # Customers
├── modules/               # Feature modules
│   ├── category/          # Category CRUD operations
│   │   ├── category.service.ts
│   │   ├── category.resolver.ts (GraphQL)
│   │   ├── category.controller.ts (REST)
│   │   └── category.module.ts
│   ├── menu/              # Menu management
│   │   ├── menu.service.ts
│   │   ├── menu.resolver.ts
│   │   └── menu.module.ts
│   └── ... (other modules)
├── dto/                   # Data Transfer Objects
│   ├── create-category.dto.ts
│   ├── update-category.dto.ts
│   ├── create-menu-item.dto.ts
│   └── create-order.dto.ts
├── seeds/                 # Database seeders
│   ├── database.seed.ts   # Main seeder
│   └── run-seed.ts        # Seeder runner
├── app.module.ts          # Main application module
└── main.ts                # Application entry point
```

## 🔄 Development Workflow

### 1. Adding New Features

1. **Create Entity** (if needed)

   ```typescript
   // src/entities/new-entity.entity.ts
   @Entity('new_entities')
   export class NewEntity extends BaseEntity {
     // Define your fields
   }
   ```

2. **Create DTOs**

   ```typescript
   // src/dto/create-new-entity.dto.ts
   export class CreateNewEntityDto {
     // Define validation and GraphQL decorators
   }
   ```

3. **Create Service**

   ```typescript
   // src/modules/new-entity/new-entity.service.ts
   @Injectable()
   export class NewEntityService {
     // CRUD operations
   }
   ```

4. **Create Resolver (GraphQL)**

   ```typescript
   // src/modules/new-entity/new-entity.resolver.ts
   @Resolver(() => NewEntity)
   export class NewEntityResolver {
     // GraphQL queries and mutations
   }
   ```

5. **Create Controller (REST)**

   ```typescript
   // src/modules/new-entity/new-entity.controller.ts
   @Controller('new-entities')
   export class NewEntityController {
     // REST endpoints with Swagger docs
   }
   ```

6. **Create Module**

   ```typescript
   // src/modules/new-entity/new-entity.module.ts
   @Module({
     imports: [TypeOrmModule.forFeature([NewEntity])],
     controllers: [NewEntityController],
     providers: [NewEntityService, NewEntityResolver],
     exports: [NewEntityService],
   })
   export class NewEntityModule {}
   ```

7. **Add to App Module**
   ```typescript
   // src/app.module.ts
   imports: [
     // ... existing imports
     NewEntityModule,
   ];
   ```

### 2. Database Changes

When you modify entities:

1. The database will auto-sync in development mode
2. For production, use TypeORM migrations
3. Update the seeder if needed

### 3. Testing

```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e

# Test coverage
yarn test:cov
```

## 🐛 Common Issues & Solutions

### Database Connection Issues

- Ensure MySQL is running
- Check database credentials in `.env`
- Verify database exists

### GraphQL Schema Issues

- Restart the development server
- Check for circular dependencies in entities
- Ensure all GraphQL decorators are properly imported

### Build Errors

- Check TypeScript types
- Ensure all imports are correct
- Verify entity relationships are properly defined

## 📈 Performance Tips

1. **Database Optimization**
   - Use proper indexes on frequently queried fields
   - Implement pagination for large result sets
   - Use selective field loading with GraphQL

2. **Caching**
   - Add Redis for caching frequently accessed data
   - Implement query result caching

3. **API Optimization**
   - Use DataLoader for GraphQL N+1 problem
   - Implement field-level security
   - Add rate limiting

## 🚀 Deployment

### Environment Variables

Create production `.env`:

```env
NODE_ENV=production
DB_HOST=your-production-db-host
DB_USERNAME=your-production-db-user
DB_PASSWORD=your-secure-password
JWT_SECRET=your-super-secure-jwt-secret
```

### Build for Production

```bash
yarn build
yarn start:prod
```

### Docker Deployment (Optional)

You can create a Dockerfile for containerized deployment:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install --production
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start:prod"]
```

Happy coding! 🎉
