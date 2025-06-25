import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { MenuItem } from '../entities/menu-item.entity';
import { Table } from '../entities/table.entity';
import { Staff } from '../entities/staff.entity';
import { Customer } from '../entities/customer.entity';
import { StaffRole, StaffStatus } from '../entities/staff.entity';
import { TableStatus } from '../entities/table.entity';
import { MenuItemStatus } from '../entities/menu-item.entity';

@Injectable()
export class DatabaseSeeder {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
    @InjectRepository(Table)
    private tableRepository: Repository<Table>,
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async seed() {
    // Clear existing data (using query builder for safer deletion)
    await this.menuItemRepository.createQueryBuilder().delete().execute();
    await this.categoryRepository.createQueryBuilder().delete().execute();
    await this.tableRepository.createQueryBuilder().delete().execute();
    await this.staffRepository.createQueryBuilder().delete().execute();
    await this.customerRepository.createQueryBuilder().delete().execute();

    // Seed Categories
    const categories = await this.seedCategories();

    // Seed Menu Items
    await this.seedMenuItems(categories);

    // Seed Tables
    await this.seedTables();

    // Seed Staff
    await this.seedStaff();

    // Seed Customers
    await this.seedCustomers();

    console.log('Database seeded successfully!');
  }

  private async seedCategories(): Promise<Category[]> {
    const categoriesData = [
      {
        name: 'Appetizers',
        description: 'Delicious starters to begin your meal',
        imageUrl: 'https://example.com/appetizers.jpg',
      },
      {
        name: 'Main Courses',
        description: 'Hearty and satisfying main dishes',
        imageUrl: 'https://example.com/mains.jpg',
      },
      {
        name: 'Desserts',
        description: 'Sweet treats to end your meal',
        imageUrl: 'https://example.com/desserts.jpg',
      },
      {
        name: 'Beverages',
        description: 'Refreshing drinks and specialty beverages',
        imageUrl: 'https://example.com/beverages.jpg',
      },
    ];

    const categories: Category[] = [];
    for (const categoryData of categoriesData) {
      const category = this.categoryRepository.create(categoryData);
      categories.push(await this.categoryRepository.save(category));
    }

    return categories;
  }

  private async seedMenuItems(categories: Category[]): Promise<void> {
    const appetizers = categories.find((c) => c.name === 'Appetizers')!;
    const mains = categories.find((c) => c.name === 'Main Courses')!;
    const desserts = categories.find((c) => c.name === 'Desserts')!;
    const beverages = categories.find((c) => c.name === 'Beverages')!;

    const menuItemsData = [
      // Appetizers
      {
        name: 'Caesar Salad',
        description:
          'Fresh romaine lettuce with caesar dressing and parmesan cheese',
        price: 12.99,
        categoryId: appetizers.id,
        preparationTime: 10,
        status: MenuItemStatus.AVAILABLE,
      },
      {
        name: 'Bruschetta',
        description: 'Toasted bread with fresh tomatoes, basil, and garlic',
        price: 8.99,
        categoryId: appetizers.id,
        preparationTime: 8,
        status: MenuItemStatus.AVAILABLE,
      },

      // Main Courses
      {
        name: 'Grilled Salmon',
        description:
          'Fresh Atlantic salmon grilled to perfection with seasonal vegetables',
        price: 24.99,
        categoryId: mains.id,
        preparationTime: 20,
        status: MenuItemStatus.AVAILABLE,
      },
      {
        name: 'Ribeye Steak',
        description: 'Premium ribeye steak cooked to your preference',
        price: 32.99,
        categoryId: mains.id,
        preparationTime: 25,
        status: MenuItemStatus.AVAILABLE,
      },
      {
        name: 'Chicken Parmesan',
        description:
          'Breaded chicken breast with marinara sauce and mozzarella',
        price: 19.99,
        categoryId: mains.id,
        preparationTime: 18,
        status: MenuItemStatus.AVAILABLE,
      },

      // Desserts
      {
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake with chocolate ganache',
        price: 7.99,
        categoryId: desserts.id,
        preparationTime: 5,
        status: MenuItemStatus.AVAILABLE,
      },
      {
        name: 'Tiramisu',
        description: 'Classic Italian dessert with coffee and mascarpone',
        price: 8.99,
        categoryId: desserts.id,
        preparationTime: 5,
        status: MenuItemStatus.AVAILABLE,
      },

      // Beverages
      {
        name: 'House Wine',
        description: 'Selection of red and white wines',
        price: 6.99,
        categoryId: beverages.id,
        preparationTime: 2,
        status: MenuItemStatus.AVAILABLE,
      },
      {
        name: 'Craft Beer',
        description: 'Local craft beer selection',
        price: 4.99,
        categoryId: beverages.id,
        preparationTime: 2,
        status: MenuItemStatus.AVAILABLE,
      },
      {
        name: 'Fresh Juice',
        description: 'Freshly squeezed orange, apple, or cranberry juice',
        price: 3.99,
        categoryId: beverages.id,
        preparationTime: 3,
        status: MenuItemStatus.AVAILABLE,
      },
    ];

    for (const itemData of menuItemsData) {
      const menuItem = this.menuItemRepository.create(itemData);
      await this.menuItemRepository.save(menuItem);
    }
  }

  private async seedTables(): Promise<void> {
    const tablesData = [
      {
        number: '1',
        capacity: 2,
        location: 'Main Floor',
        status: TableStatus.AVAILABLE,
      },
      {
        number: '2',
        capacity: 4,
        location: 'Main Floor',
        status: TableStatus.AVAILABLE,
      },
      {
        number: '3',
        capacity: 6,
        location: 'Main Floor',
        status: TableStatus.AVAILABLE,
      },
      {
        number: '4',
        capacity: 2,
        location: 'Patio',
        status: TableStatus.AVAILABLE,
      },
      {
        number: '5',
        capacity: 4,
        location: 'Patio',
        status: TableStatus.AVAILABLE,
      },
      {
        number: '6',
        capacity: 8,
        location: 'Private Room',
        status: TableStatus.AVAILABLE,
      },
      {
        number: '7',
        capacity: 2,
        location: 'Main Floor',
        status: TableStatus.OCCUPIED,
      },
      {
        number: '8',
        capacity: 4,
        location: 'Main Floor',
        status: TableStatus.RESERVED,
      },
    ];

    for (const tableData of tablesData) {
      const table = this.tableRepository.create(tableData);
      await this.tableRepository.save(table);
    }
  }

  private async seedStaff(): Promise<void> {
    const staffData = [
      {
        firstName: 'John',
        lastName: 'Manager',
        email: 'john.manager@restaurant.com',
        phone: '+1234567890',
        role: StaffRole.MANAGER,
        status: StaffStatus.ACTIVE,
        hourlyRate: 25.0,
        hireDate: new Date('2023-01-15'),
      },
      {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@restaurant.com',
        phone: '+1234567891',
        role: StaffRole.WAITER,
        status: StaffStatus.ACTIVE,
        hourlyRate: 15.0,
        hireDate: new Date('2023-03-20'),
      },
      {
        firstName: 'Mike',
        lastName: 'Chen',
        email: 'mike.chen@restaurant.com',
        phone: '+1234567892',
        role: StaffRole.CHEF,
        status: StaffStatus.ACTIVE,
        hourlyRate: 22.0,
        hireDate: new Date('2023-02-10'),
      },
      {
        firstName: 'Lisa',
        lastName: 'Rodriguez',
        email: 'lisa.rodriguez@restaurant.com',
        phone: '+1234567893',
        role: StaffRole.WAITER,
        status: StaffStatus.ACTIVE,
        hourlyRate: 15.0,
        hireDate: new Date('2023-04-05'),
      },
    ];

    for (const staffMember of staffData) {
      const staff = this.staffRepository.create(staffMember);
      await this.staffRepository.save(staff);
    }
  }

  private async seedCustomers(): Promise<void> {
    const customersData = [
      {
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice.smith@email.com',
        phone: '+1555123456',
        address: '123 Main St, City, State',
        dateOfBirth: new Date('1985-06-15'),
      },
      {
        firstName: 'Bob',
        lastName: 'Wilson',
        email: 'bob.wilson@email.com',
        phone: '+1555123457',
        address: '456 Oak Ave, City, State',
        dateOfBirth: new Date('1978-12-03'),
      },
      {
        firstName: 'Carol',
        lastName: 'Davis',
        email: 'carol.davis@email.com',
        phone: '+1555123458',
        address: '789 Pine Rd, City, State',
        dateOfBirth: new Date('1992-09-22'),
      },
    ];

    for (const customerData of customersData) {
      const customer = this.customerRepository.create(customerData);
      await this.customerRepository.save(customer);
    }
  }
}
