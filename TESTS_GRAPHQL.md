# Tests GraphQL - Système de Gestion de Restaurant

## Guide des Requêtes GraphQL pour Tester l'Application

Ce document contient une collection complète de requêtes GraphQL que vous pouvez utiliser pour tester votre application de gestion de restaurant. Chaque requête est accompagnée d'explications détaillées.

## Table des Matières

1. [Comment Utiliser ce Guide](#comment-utiliser-ce-guide)
2. [Requêtes de Base (Queries)](#requêtes-de-base-queries)
3. [Mutations (Modifications)](#mutations-modifications)
4. [Requêtes Avancées avec Relations](#requêtes-avancées-avec-relations)
5. [Filtrage et Recherche](#filtrage-et-recherche)
6. [Gestion des Erreurs](#gestion-des-erreurs)
7. [Variables et Fragments](#variables-et-fragments)
8. [Tests de Performance](#tests-de-performance)

## Comment Utiliser ce Guide

### Accès au GraphQL Playground

1. Assurez-vous que votre application est démarrée : `yarn start:dev`
2. Ouvrez votre navigateur à : http://localhost:3000/graphql
3. Copiez-collez les requêtes de ce guide dans l'éditeur
4. Cliquez sur le bouton "Play" pour exécuter

### Structure des Exemples

Chaque exemple contient :

- **Requête** : Le code GraphQL à exécuter
- **Explication** : Ce que fait la requête
- **Réponse Attendue** : Un exemple de réponse
- **Cas d'Usage** : Quand utiliser cette requête

---

## Requêtes de Base (Queries)

### 1. Récupérer Toutes les Catégories

```graphql
query GetAllCategories {
  categories {
    id
    name
    description
    imageUrl
    isActive
    createdAt
    updatedAt
  }
}
```

**Explication** : Cette requête récupère toutes les catégories de menu avec leurs informations de base.

**Réponse Attendue** :

```json
{
  "data": {
    "categories": [
      {
        "id": "a29f9dc1-4288-4840-a5dd-f188fcded949",
        "name": "Appetizers",
        "description": "Delicious starters to begin your meal",
        "imageUrl": "https://example.com/appetizers.jpg",
        "isActive": true,
        "createdAt": "2025-06-25T14:38:49.000Z",
        "updatedAt": "2025-06-25T14:38:49.000Z"
      }
    ]
  }
}
```

**Cas d'Usage** : Afficher toutes les catégories dans un menu principal ou un tableau d'administration.

---

### 2. Récupérer Tous les Articles de Menu

```graphql
query GetAllMenuItems {
  menuItems {
    id
    name
    description
    price
    preparationTime
    status
    isActive
    imageUrl
  }
}
```

**Explication** : Récupère tous les articles du menu avec leurs détails essentiels.

**Cas d'Usage** : Afficher la carte complète du restaurant.

---

### 3. Récupérer un Article Spécifique

```graphql
query GetMenuItem($id: ID!) {
  menuItem(id: $id) {
    id
    name
    description
    price
    preparationTime
    status
    category {
      id
      name
    }
  }
}
```

**Variables** :

```json
{
  "id": "9aaa7043-e00a-4a50-b057-894d35f8e563"
}
```

**Explication** : Récupère un article spécifique du menu par son ID, incluant sa catégorie.

**Cas d'Usage** : Page de détail d'un plat ou modification d'un article.

---

### 4. Récupérer les Articles par Catégorie

```graphql
query GetMenuItemsByCategory($categoryId: ID!) {
  menuItemsByCategory(categoryId: $categoryId) {
    id
    name
    price
    status
    preparationTime
  }
}
```

**Variables** :

```json
{
  "categoryId": "a29f9dc1-4288-4840-a5dd-f188fcded949"
}
```

**Explication** : Récupère tous les articles d'une catégorie spécifique.

**Cas d'Usage** : Filtrer le menu par type (entrées, plats principaux, etc.).

---

### 5. Récupérer les Articles Disponibles

```graphql
query GetAvailableMenuItems {
  availableMenuItems {
    id
    name
    price
    preparationTime
    category {
      name
    }
  }
}
```

**Explication** : Récupère uniquement les articles disponibles à la commande.

**Cas d'Usage** : Afficher le menu pour les clients (masquer les articles en rupture).

---

## Mutations (Modifications)

### 6. Créer une Nouvelle Catégorie

```graphql
mutation CreateCategory($input: CreateCategoryInput!) {
  createCategory(createCategoryInput: $input) {
    id
    name
    description
    imageUrl
    isActive
    createdAt
  }
}
```

**Variables** :

```json
{
  "input": {
    "name": "Cocktails",
    "description": "Boissons alcoolisées et cocktails maison",
    "imageUrl": "https://example.com/cocktails.jpg"
  }
}
```

**Explication** : Crée une nouvelle catégorie de menu.

**Cas d'Usage** : Ajouter une nouvelle section au menu (ex: Cocktails, Brunchs).

---

### 7. Créer un Nouvel Article de Menu

```graphql
mutation CreateMenuItem($input: CreateMenuItemInput!) {
  createMenuItem(createMenuItemInput: $input) {
    id
    name
    description
    price
    preparationTime
    status
    category {
      id
      name
    }
  }
}
```

**Variables** :

```json
{
  "input": {
    "name": "Salade César Deluxe",
    "description": "Salade romaine fraîche avec poulet grillé, parmesan et croûtons maison",
    "price": 16.99,
    "categoryId": "a29f9dc1-4288-4840-a5dd-f188fcded949",
    "preparationTime": 12,
    "imageUrl": "https://example.com/caesar-deluxe.jpg"
  }
}
```

**Explication** : Ajoute un nouvel article au menu avec tous ses détails.

**Cas d'Usage** : Enrichir la carte avec de nouveaux plats.

---

### 8. Mettre à Jour un Article de Menu

```graphql
mutation UpdateMenuItem($id: ID!, $input: UpdateMenuItemInput!) {
  updateMenuItem(id: $id, updateMenuItemInput: $input) {
    id
    name
    price
    status
    updatedAt
  }
}
```

**Variables** :

```json
{
  "id": "9aaa7043-e00a-4a50-b057-894d35f8e563",
  "input": {
    "id": "9aaa7043-e00a-4a50-b057-894d35f8e563",
    "price": 14.99,
    "status": "UNAVAILABLE"
  }
}
```

**Explication** : Modifie les informations d'un article existant (prix, statut, etc.).

**Cas d'Usage** : Changer les prix, marquer un plat comme indisponible.

---

### 9. Supprimer un Article de Menu

```graphql
mutation RemoveMenuItem($id: ID!) {
  removeMenuItem(id: $id)
}
```

**Variables** :

```json
{
  "id": "9aaa7043-e00a-4a50-b057-894d35f8e563"
}
```

**Explication** : Supprime (soft delete) un article du menu.

**Cas d'Usage** : Retirer définitivement un plat de la carte.

---

## Requêtes Avancées avec Relations

### 10. Menu Complet avec Relations

```graphql
query GetCompleteMenu {
  categories {
    id
    name
    description
    menuItems {
      id
      name
      description
      price
      preparationTime
      status
      imageUrl
    }
  }
}
```

**Explication** : Récupère toutes les catégories avec leurs articles associés en une seule requête.

**Cas d'Usage** : Construire un menu complet pour l'affichage client.

---

### 11. Articles avec Informations de Catégorie Détaillées

```graphql
query GetMenuItemsWithCategories {
  menuItems {
    id
    name
    price
    status
    category {
      id
      name
      description
    }
  }
}
```

**Explication** : Récupère les articles avec les détails complets de leurs catégories.

**Cas d'Usage** : Tableau d'administration avec informations complètes.

---

## Filtrage et Recherche

### 12. Recherche d'Articles par Nom

```graphql
query SearchMenuItems($searchTerm: String!) {
  searchMenuItems(searchTerm: $searchTerm) {
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

**Variables** :

```json
{
  "searchTerm": "Caesar"
}
```

**Explication** : Recherche des articles contenant le terme spécifié dans le nom.

**Cas d'Usage** : Fonction de recherche pour les clients ou l'administration.

---

### 13. Récupérer les Catégories Actives Uniquement

```graphql
query GetActiveCategories {
  activeCategories {
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

**Explication** : Récupère uniquement les catégories actives avec leurs articles.

**Cas d'Usage** : Affichage public du menu (masquer les catégories désactivées).

---

## Gestion des Erreurs

### 14. Requête avec ID Inexistant

```graphql
query GetNonExistentMenuItem {
  menuItem(id: "00000000-0000-0000-0000-000000000000") {
    id
    name
    price
  }
}
```

**Réponse Attendue** :

```json
{
  "data": {
    "menuItem": null
  },
  "errors": [
    {
      "message": "MenuItem not found",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["menuItem"]
    }
  ]
}
```

**Explication** : Démontre la gestion des erreurs quand un ID n'existe pas.

---

### 15. Mutation avec Données Invalides

```graphql
mutation CreateInvalidMenuItem($input: CreateMenuItemInput!) {
  createMenuItem(createMenuItemInput: $input) {
    id
    name
    price
  }
}
```

**Variables (invalides)** :

```json
{
  "input": {
    "name": "",
    "price": -5.0,
    "categoryId": "invalid-id"
  }
}
```

**Explication** : Test de validation des données d'entrée.

---

## Variables et Fragments

### 16. Utilisation de Fragments

```graphql
fragment MenuItemInfo on MenuItem {
  id
  name
  description
  price
  preparationTime
  status
}

fragment CategoryInfo on Category {
  id
  name
  description
  isActive
}

query GetMenuWithFragments {
  categories {
    ...CategoryInfo
    menuItems {
      ...MenuItemInfo
      category {
        ...CategoryInfo
      }
    }
  }
}
```

**Explication** : Utilise des fragments pour réutiliser des sélections de champs.

**Cas d'Usage** : Éviter la duplication dans des requêtes complexes.

---

### 17. Requête avec Variables Multiples

```graphql
query GetFilteredMenu($categoryId: ID, $status: String, $maxPrice: Float) {
  menuItems: menuItemsByCategory(categoryId: $categoryId) {
    id
    name
    price
    status
    category {
      name
    }
  }

  availableItems: availableMenuItems {
    id
    name
    price
  }
}
```

**Variables** :

```json
{
  "categoryId": "a29f9dc1-4288-4840-a5dd-f188fcded949",
  "status": "available",
  "maxPrice": 20.0
}
```

**Explication** : Combine plusieurs requêtes avec des variables pour un filtrage avancé.

---

## Tests de Performance

### 18. Requête Optimisée (Champs Minimaux)

```graphql
query GetMenuItemsOptimized {
  menuItems {
    id
    name
    price
  }
}
```

**Explication** : Requête optimisée récupérant uniquement les champs nécessaires.

**Cas d'Usage** : Liste rapide pour sélection ou autocomplete.

---

### 19. Requête Complète (Tous les Champs)

```graphql
query GetMenuItemsComplete {
  menuItems {
    id
    name
    description
    price
    imageUrl
    preparationTime
    status
    isActive
    createdAt
    updatedAt
    category {
      id
      name
      description
      imageUrl
      isActive
      createdAt
      updatedAt
    }
  }
}
```

**Explication** : Requête récupérant tous les champs disponibles.

**Cas d'Usage** : Export complet de données ou interface d'administration détaillée.

---

## Requêtes d'Introspection

### 20. Explorer le Schéma GraphQL

```graphql
query GetSchemaTypes {
  __schema {
    types {
      name
      kind
      description
    }
  }
}
```

**Explication** : Récupère tous les types disponibles dans le schéma GraphQL.

**Cas d'Usage** : Documentation automatique, exploration de l'API.

---

### 21. Détails d'un Type Spécifique

```graphql
query GetMenuItemTypeInfo {
  __type(name: "MenuItem") {
    name
    description
    fields {
      name
      type {
        name
        kind
      }
      description
    }
  }
}
```

**Explication** : Récupère les détails du type MenuItem (champs, types, descriptions).

**Cas d'Usage** : Comprendre la structure des données disponibles.

---

## Conseils pour les Tests

### Bonnes Pratiques

1. **Nommage des Requêtes** : Utilisez toujours des noms descriptifs
2. **Variables** : Préférez les variables aux valeurs hardcodées
3. **Fragments** : Réutilisez les fragments pour éviter la duplication
4. **Erreurs** : Testez les cas d'erreur autant que les cas de succès

### Séquence de Tests Recommandée

1. **Tests de Base** : Commencez par les requêtes simples (1-5)
2. **Tests de Création** : Créez des données avec les mutations (6-7)
3. **Tests de Relations** : Vérifiez les jointures (10-11)
4. **Tests de Recherche** : Validez le filtrage (12-13)
5. **Tests d'Erreurs** : Vérifiez la gestion d'erreurs (14-15)

### Surveillance des Performances

- Surveillez les temps de réponse dans l'onglet "Network" de votre navigateur
- Comparez les requêtes optimisées vs complètes
- Vérifiez les requêtes SQL générées dans les logs de votre application

---

## Conclusion

Ce guide fournit une base complète pour tester votre API GraphQL. Chaque requête illustre différents aspects de GraphQL : requêtes simples, mutations, relations, filtrage, et gestion d'erreurs.

**Prochaines Étapes** :

1. Exécutez chaque requête dans GraphQL Playground
2. Modifiez les variables pour tester différents scénarios
3. Créez vos propres requêtes basées sur ces exemples
4. Intégrez ces requêtes dans votre application frontend

N'hésitez pas à expérimenter et à adapter ces requêtes selon vos besoins spécifiques !
