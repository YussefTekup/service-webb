# Guide Complet du Projet - Système de Gestion de Restaurant avec GraphQL

## Table des Matières

1. [Vue d'ensemble du Projet](#vue-densemble-du-projet)
2. [Architecture et Technologies](#architecture-et-technologies)
3. [Développement du Projet](#développement-du-projet)
4. [Qu'est-ce que GraphQL ?](#quest-ce-que-graphql)
5. [Comment GraphQL Fonctionne](#comment-graphql-fonctionne)
6. [Apprendre GraphQL](#apprendre-graphql)
7. [Configuration et Installation](#configuration-et-installation)
8. [Structure du Projet](#structure-du-projet)

## Vue d'ensemble du Projet

Ce projet est un **Système de Gestion de Restaurant** développé comme projet académique utilisant des technologies modernes. Il démontre l'implémentation d'une API GraphQL complète avec NestJS, TypeORM, et MySQL.

### Objectifs du Projet

- Créer une API GraphQL fonctionnelle pour la gestion d'un restaurant
- Démontrer l'utilisation de NestJS avec TypeORM
- Implémenter des relations de base de données complexes
- Fournir à la fois des endpoints REST et GraphQL
- Documenter les APIs avec Swagger

## Architecture et Technologies

### Stack Technologique

- **Backend Framework**: NestJS (Node.js)
- **API**: GraphQL + REST
- **Base de Données**: MySQL 8.0
- **ORM**: TypeORM
- **Documentation**: Swagger/OpenAPI
- **Validation**: class-validator, class-transformer
- **Containerisation**: Docker

### Architecture en Couches

```
┌─────────────────────────────────────┐
│         Couche Présentation         │
│    (GraphQL Resolvers + REST)       │
├─────────────────────────────────────┤
│         Couche Service              │
│    (Logique Métier)                 │
├─────────────────────────────────────┤
│         Couche Repository           │
│    (TypeORM Repositories)           │
├─────────────────────────────────────┤
│         Base de Données             │
│    (MySQL)                          │
└─────────────────────────────────────┘
```

## Développement du Projet

### Étape 1: Initialisation du Projet

```bash
# Installation de NestJS CLI
npm i -g @nestjs/cli

# Création du projet
nest new service-webb

# Installation des dépendances GraphQL
yarn add @nestjs/graphql @nestjs/apollo @apollo/server graphql
```

### Étape 2: Configuration de la Base de Données

```bash
# Installation de TypeORM et MySQL
yarn add @nestjs/typeorm typeorm mysql2

# Configuration Docker pour MySQL
docker run --name restaurant-mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=restaurant_db \
  -p 3306:3306 -d mysql:8.0
```

### Étape 3: Création des Entités

Nous avons créé des entités TypeORM pour représenter notre domaine métier :

#### Entité de Base (BaseEntity)

```typescript
@ObjectType()
export abstract class BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
```

#### Entités Principales

1. **Category** - Catégories de menu (Entrées, Plats, Desserts)
2. **MenuItem** - Articles du menu avec prix et temps de préparation
3. **Table** - Tables du restaurant avec capacité et statut
4. **Customer** - Profils clients
5. **Staff** - Employés avec rôles et taux horaires
6. **Order** - Commandes avec statut et totaux
7. **OrderItem** - Articles de commande (table de liaison)

### Étape 4: Implémentation GraphQL

#### Resolvers GraphQL

Les resolvers sont responsables de traiter les requêtes GraphQL :

```typescript
@Resolver(() => MenuItem)
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  @Query(() => [MenuItem], { name: 'menuItems' })
  async findAll(): Promise<MenuItem[]> {
    return this.menuService.findAll();
  }

  @Mutation(() => MenuItem)
  async createMenuItem(
    @Args('createMenuItemInput') createMenuItemInput: CreateMenuItemInput,
  ): Promise<MenuItem> {
    return this.menuService.create(createMenuItemInput);
  }
}
```

### Étape 5: Services et Logique Métier

Les services contiennent la logique métier et interagissent avec la base de données :

```typescript
@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
  ) {}

  async findAll(): Promise<MenuItem[]> {
    return this.menuItemRepository.find({
      relations: ['category'],
      where: { isActive: true },
    });
  }
}
```

### Étape 6: Configuration et Documentation

- Configuration de Swagger pour la documentation REST
- Setup de GraphQL Playground pour les tests GraphQL
- Variables d'environnement pour la configuration

## Qu'est-ce que GraphQL ?

### Définition

GraphQL est un **langage de requête** et un **runtime** pour les APIs développé par Facebook en 2012. Il permet aux clients de demander exactement les données dont ils ont besoin.

### Avantages de GraphQL

1. **Requêtes Précises** : Récupérer uniquement les données nécessaires
2. **Un Seul Endpoint** : Toutes les opérations via `/graphql`
3. **Typage Fort** : Schéma défini avec validation automatique
4. **Introspection** : API auto-documentée
5. **Évolution** : Ajout de champs sans versioning

### Comparaison REST vs GraphQL

| Aspect        | REST                           | GraphQL              |
| ------------- | ------------------------------ | -------------------- |
| Endpoints     | Multiples (`/users`, `/posts`) | Un seul (`/graphql`) |
| Données       | Structure fixe                 | À la demande         |
| Over-fetching | Courant                        | Éliminé              |
| Versioning    | Nécessaire                     | Évolution continue   |
| Caching       | Simple (HTTP)                  | Plus complexe        |

## Comment GraphQL Fonctionne

### 1. Schéma GraphQL

Le schéma définit la structure de l'API :

```graphql
type Category {
  id: ID!
  name: String!
  description: String
  menuItems: [MenuItem!]!
}

type MenuItem {
  id: ID!
  name: String!
  price: Float!
  category: Category!
}

type Query {
  categories: [Category!]!
  menuItems: [MenuItem!]!
}

type Mutation {
  createCategory(input: CreateCategoryInput!): Category!
}
```

### 2. Types d'Opérations

- **Query** : Lecture de données (équivalent GET)
- **Mutation** : Modification de données (POST, PUT, DELETE)
- **Subscription** : Données en temps réel (WebSocket)

### 3. Résolution des Requêtes

1. **Parsing** : Analyse de la requête
2. **Validation** : Vérification contre le schéma
3. **Exécution** : Appel des resolvers
4. **Sérialisation** : Formatage de la réponse

## Apprendre GraphQL

### Concepts Fondamentaux

#### 1. Types Scalaires

```graphql
scalar String # Chaîne de caractères
scalar Int # Nombre entier
scalar Float # Nombre décimal
scalar Boolean # Vrai/Faux
scalar ID # Identifiant unique
```

#### 2. Types Objets

```graphql
type User {
  id: ID! # ! = non-nullable
  name: String!
  email: String
  posts: [Post!]! # [] = array
}
```

#### 3. Arguments et Variables

```graphql
# Avec arguments
query {
  user(id: "123") {
    name
    email
  }
}

# Avec variables
query GetUser($userId: ID!) {
  user(id: $userId) {
    name
    email
  }
}
```

#### 4. Fragments

```graphql
fragment UserInfo on User {
  id
  name
  email
}

query {
  user(id: "123") {
    ...UserInfo
    posts {
      title
    }
  }
}
```

### Pratiques Recommandées

#### 1. Nommage des Requêtes

```graphql
# ✅ Bon
query GetRestaurantMenu {
  categories {
    name
    menuItems {
      name
      price
    }
  }
}

# ❌ Éviter
query {
  categories {
    name
  }
}
```

#### 2. Gestion des Erreurs

```graphql
# Réponse avec erreur
{
  "data": null,
  "errors": [
    {
      "message": "Category not found",
      "locations": [{"line": 2, "column": 3}],
      "path": ["category"]
    }
  ]
}
```

#### 3. Pagination

```graphql
query GetMenuItems($first: Int!, $after: String) {
  menuItems(first: $first, after: $after) {
    edges {
      node {
        id
        name
        price
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

### Outils d'Apprentissage

#### 1. GraphQL Playground

Interface web pour tester les requêtes :

- Auto-complétion
- Documentation intégrée
- Historique des requêtes

#### 2. Introspection

```graphql
query {
  __schema {
    types {
      name
      fields {
        name
        type {
          name
        }
      }
    }
  }
}
```

## Configuration et Installation

### Prérequis

- Node.js 18+
- Docker (pour MySQL)
- Yarn ou npm

### Installation

```bash
# Cloner le projet
git clone <repository-url>
cd service-webb

# Installer les dépendances
yarn install

# Configurer la base de données
docker run --name restaurant-mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=restaurant_db \
  -p 3306:3306 -d mysql:8.0

# Variables d'environnement
cp .env.example .env

# Démarrer l'application
yarn start:dev

# Peupler la base de données
yarn ts-node src/seeds/run-seed.ts
```

### Variables d'Environnement

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=restaurant_db

# Application Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
```

## Structure du Projet

```
src/
├── dto/                    # Data Transfer Objects
│   ├── create-category.dto.ts
│   ├── create-menu-item.dto.ts
│   └── update-menu-item.dto.ts
├── entities/               # Entités TypeORM
│   ├── base.entity.ts
│   ├── category.entity.ts
│   ├── menu-item.entity.ts
│   └── ...
├── modules/               # Modules NestJS
│   ├── category/
│   │   ├── category.controller.ts    # REST Controller
│   │   ├── category.resolver.ts      # GraphQL Resolver
│   │   ├── category.service.ts       # Logique métier
│   │   └── category.module.ts        # Module NestJS
│   └── menu/
├── seeds/                 # Scripts de peuplement
│   ├── database.seed.ts
│   └── run-seed.ts
├── app.module.ts          # Module principal
└── main.ts               # Point d'entrée
```

### Modules Principaux

#### 1. Module Category

- **Controller** : Endpoints REST pour les catégories
- **Resolver** : Requêtes/Mutations GraphQL
- **Service** : Logique métier pour la gestion des catégories

#### 2. Module Menu

- **Resolver** : Gestion des articles de menu via GraphQL
- **Service** : CRUD et recherche d'articles

#### 3. Modules Additionnels

- **Customer** : Gestion des clients
- **Table** : Gestion des tables
- **Staff** : Gestion du personnel
- **Order** : Gestion des commandes

### Points d'Accès de l'Application

- **Application** : http://localhost:3000
- **GraphQL Playground** : http://localhost:3000/graphql
- **Documentation Swagger** : http://localhost:3000/api

## Conclusion

Ce projet démontre l'implémentation complète d'une API GraphQL moderne avec NestJS. Il illustre les bonnes pratiques de développement, l'architecture en couches, et l'intégration de GraphQL avec une base de données relationnelle.

Les concepts GraphQL abordés dans ce guide fournissent une base solide pour comprendre et développer des APIs GraphQL robustes et scalables.
