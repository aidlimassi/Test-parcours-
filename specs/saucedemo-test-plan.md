# Plan de tests Saucedemo

## Application Overview

Plan Playwright pour Saucedemo couvrant l’authentification, le catalogue, le tri, les détails produit, le panier, le checkout, le menu et les états de session. Chaque scénario suppose un navigateur neuf et une page authentifiée lorsque l’étape le précise.

## Test Scenarios

### 1. Authentification

**Seed:** `tests/seed.spec.ts`

#### 1.1. Connexion valide avec un utilisateur standard

**File:** `tests/auth.spec.ts`

**Steps:**
  1. Depuis l’état vierge, ouvrir https://www.saucedemo.com.
    - expect: La page affiche les champs Username et Password, ainsi que le bouton Login.
  2. Saisir standard_user dans Username et secret_sauce dans Password, puis cliquer sur Login.
    - expect: L’application ouvre /inventory.html.
    - expect: La page affiche Swag Labs, le titre Products et les six produits.

#### 1.2. Connexion refusée avec des identifiants invalides

**File:** `tests/auth.spec.ts`

**Steps:**
  1. Depuis la page de connexion vierge, saisir un utilisateur inexistant et un mot de passe incorrect, puis cliquer sur Login.
    - expect: Aucune navigation vers l’inventaire n’a lieu.
    - expect: Un message d’erreur indique que les identifiants ne correspondent à aucun utilisateur.
    - expect: Les champs restent accessibles.

#### 1.3. Connexion avec des champs vides

**File:** `tests/auth.spec.ts`

**Steps:**
  1. Depuis la page de connexion vierge, cliquer sur Login sans saisir Username ni Password.
    - expect: La connexion échoue.
    - expect: Un message d’erreur demande de saisir Username.
    - expect: Aucune redirection vers l’inventaire n’a lieu.

#### 1.4. Utilisateur verrouillé

**File:** `tests/auth.spec.ts`

**Steps:**
  1. Se connecter avec locked_out_user et secret_sauce.
    - expect: La connexion échoue.
    - expect: Un message indique que cet utilisateur a été verrouillé.
    - expect: La page reste sur la connexion.

#### 1.5. Accès direct protégé à l’inventaire

**File:** `tests/auth.spec.ts`

**Steps:**
  1. Dans un navigateur neuf sans session, naviguer directement vers /inventory.html.
    - expect: La page n’affiche pas les produits.
    - expect: L’utilisateur est redirigé vers la page de connexion.
    - expect: Une erreur exige une connexion.

#### 1.6. Déconnexion depuis le menu

**File:** `tests/auth.spec.ts`

**Steps:**
  1. Se connecter avec standard_user, ouvrir le menu, puis sélectionner Logout.
    - expect: L’utilisateur revient sur la page de connexion.
    - expect: Les champs Username et Password sont vides.
    - expect: Après retour arrière, l’inventaire n’est pas accessible sans nouvelle connexion.

### 2. Catalogue et tri

**Seed:** `tests/seed.spec.ts`

#### 2.1. Affichage complet du catalogue

**File:** `tests/catalog.spec.ts`

**Steps:**
  1. Se connecter avec standard_user et atteindre l’inventaire.
    - expect: La page contient exactement six produits : Backpack, Bike Light, Bolt T-Shirt, Fleece Jacket, Onesie et Test.allTheThings() T-Shirt (Red).
    - expect: Chaque produit expose son image, son nom, sa description, son prix et un bouton Add to cart.

#### 2.2. Tri par nom croissant

**File:** `tests/catalog.spec.ts`

**Steps:**
  1. Laisser le tri par défaut Name (A to Z), puis vérifier l’ordre du catalogue.
    - expect: Les produits sont triés par ordre alphétique croissant.

#### 2.3. Tri par nom décroissant

**File:** `tests/catalog.spec.ts`

**Steps:**
  1. Sélectionner Name (Z to A) dans le menu Sort.
    - expect: Les six noms sont affichés en ordre alphétique décroissant.

#### 2.4. Tri par prix croissant

**File:** `tests/catalog.spec.ts`

**Steps:**
  1. Sélectionner Price (low to high).
    - expect: Les prix sont ordonnés du moins cher au plus cher : 7.99, 9.99, 15.99, 15.99, 29.99, 49.99.

#### 2.5. Tri par prix décroissant

**File:** `tests/catalog.spec.ts`

**Steps:**
  1. Sélectionner Price (high to low).
    - expect: Les prix sont ordonnés du plus cher au moins cher : 49.99, 29.99, 15.99, 15.99, 9.99, 7.99.

#### 2.6. Accéder aux détails d’un produit

**File:** `tests/catalog.spec.ts`

**Steps:**
  1. Depuis l’inventaire, cliquer sur le nom ou l’image de Sauce Labs Backpack.
    - expect: La page détail affiche le nom Sauce Labs Backpack, sa description, son prix de 29.99 et les boutons Back to products et Add to cart.
  2. Cliquer sur Back to products.
    - expect: L’utilisateur revient à l’inventaire sans perte de l’état du panier.

### 3. Panier

**Seed:** `tests/seed.spec.ts`

#### 3.1. Ajouter un produit au panier

**File:** `tests/cart.spec.ts`

**Steps:**
  1. Depuis l’inventaire vierge, cliquer sur Add to cart pour Sauce Labs Backpack.
    - expect: Le bouton devient Remove.
    - expect: Le badge du panier passe de vide à 1.
    - expect: Une seule occurrence du produit peut être ajoutée.

#### 3.2. Ajouter plusieurs produits puis retirer un article

**File:** `tests/cart.spec.ts`

**Steps:**
  1. Ajouter Backpack et Bike Light au panier.
    - expect: Le badge du panier affiche 2.
  2. Ouvrir le panier et vérifier les deux articles.
    - expect: Le panier contient Backpack à 29.99 et Bike Light à 9.99.
  3. Retirer Bike Light avec Remove.
    - expect: Le panier ne contient plus que Backpack.
    - expect: Le badge passe à 1.

#### 3.3. Vérifier un panier vide

**File:** `tests/cart.spec.ts`

**Steps:**
  1. Depuis un panier vierge, ouvrir la page du panier.
    - expect: La page affiche le panier sans article.
    - expect: Aucun sous-total ou détail de taxe n’est affiché tant qu’il n’y a pas d’article.

#### 3.4. Continuer les achats depuis le panier

**File:** `tests/cart.spec.ts`

**Steps:**
  1. Ouvrir le panier après avoir ajouté un produit, puis cliquer sur Continue Shopping.
    - expect: L’utilisateur revient à l’inventaire.
    - expect: Le produit reste ajouté et le badge conserve sa quantité.

#### 3.5. Retirer un produit depuis la page inventaire

**File:** `tests/cart.spec.ts`

**Steps:**
  1. Ajouter puis retirer Sauce Labs Backpack depuis l’inventaire.
    - expect: Le bouton devient Add to cart.
    - expect: Le badge du panier est supprimé ou affiche 0.
    - expect: Le produit n’est pas ajouté au checkout.

#### 3.6. Ajout depuis la page détail

**File:** `tests/cart.spec.ts`

**Steps:**
  1. Ouvrir les détails de Sauce Labs Bike Light, ajouter le produit, puis ouvrir le panier.
    - expect: Le panier contient Bike Light une seule fois.
    - expect: Le badge du panier affiche 1.

### 4. Checkout

**Seed:** `tests/seed.spec.ts`

#### 4.1. Checkout complet avec un article

**File:** `tests/checkout.spec.ts`

**Steps:**
  1. Ajouter Sauce Labs Backpack, ouvrir le panier, puis cliquer sur Checkout.
    - expect: La page Checkout: Your Information est affichée.
    - expect: Les champs First Name, Last Name et Postal Code sont visibles.
  2. Saisir Ada, Lovelace et 75001, puis cliquer sur Continue.
    - expect: La page Checkout: Overview affiche Backpack, sa quantité et son prix.
  3. Vérifier les montants puis cliquer sur Finish.
    - expect: Le sous-total est 29.99.
    - expect: La taxe est calculée avec le taux appliqué.
    - expect: Le total vaut sous-total plus taxe.
    - expect: La page Checkout: Complete! confirme la commande.
    - expect: Le bouton Back Home est disponible.
  4. Cliquer sur Back Home.
    - expect: L’utilisateur revient à l’inventaire.
    - expect: Le panier est vide.
    - expect: Tous les produits sont disponibles.

#### 4.2. Validation des champs obligatoires au checkout

**File:** `tests/checkout.spec.ts`

**Steps:**
  1. Ajouter un produit, démarrer le checkout et cliquer sur Continue avec tous les champs vides.
    - expect: Le formulaire reste affiché.
    - expect: Un message d’erreur indique que First Name est requis.
    - expect: Aucune page de récapitulatif n’est créée.

#### 4.3. Validation isolée du prénom

**File:** `tests/checkout.spec.ts`

**Steps:**
  1. Laisser First Name vide, renseigner Last Name et Postal Code, puis continuer.
    - expect: Le checkout reste bloqué sur vos informations.
    - expect: Une erreur précise que First Name est requis.

#### 4.4. Validation isolée du nom

**File:** `tests/checkout.spec.ts`

**Steps:**
  1. Renseigner First Name, laisser Last Name vide, renseigner Postal Code, puis continuer.
    - expect: Une erreur indique que Last Name est requis.
    - expect: Aucune navigation vers l’aperçu n’a lieu.

#### 4.5. Validation isolée du code postal

**File:** `tests/checkout.spec.ts`

**Steps:**
  1. Renseigner First Name et Last Name, laisser Postal Code vide, puis continuer.
    - expect: Une erreur indique que Postal Code est requis.
    - expect: Aucune navigation vers l’aperçu n’a lieu.

#### 4.6. Annuler depuis les informations

**File:** `tests/checkout.spec.ts`

**Steps:**
  1. Ajouter un produit, ouvrir le checkout, puis cliquer sur Cancel.
    - expect: L’utilisateur revient au panier.
    - expect: Le produit ajouté reste dans le panier.

#### 4.7. Annuler depuis l’aperçu

**File:** `tests/checkout.spec.ts`

**Steps:**
  1. Compléter les informations de checkout jusqu’à l’aperçu, puis cliquer sur Cancel.
    - expect: L’utilisateur revient à l’inventaire.
    - expect: Le panier conserve les articles ajoutés.
    - expect: Aucune commande n’est créée.

#### 4.8. Checkout du panier vide

**File:** `tests/checkout.spec.ts`

**Steps:**
  1. Ouvrir le panier sans article, puis rechercher une action Checkout.
    - expect: Checkout ne doit pas permettre de poursuivre un achat vide.
    - expect: Si l’application autorise l’action, afficher un message ou rediriger vers une commande utilisable sans montant.

### 5. Menu et état de session

**Seed:** `tests/seed.spec.ts`

#### 5.1. Ouvrir et fermer le menu

**File:** `tests/menu.spec.ts`

**Steps:**
  1. Se connecter, ouvrir le menu principal, puis cliquer sur Close Menu.
    - expect: Le panneau de navigation se ferme.
    - expect: La page inventaire reste inchangée.

#### 5.2. Lien All Items

**File:** `tests/menu.spec.ts`

**Steps:**
  1. Depuis une page détail ou panier, ouvrir le menu et sélectionner All Items.
    - expect: L’utilisateur revient à l’inventaire.
    - expect: Le contenu du panier est conservé.

#### 5.3. Lien About

**File:** `tests/menu.spec.ts`

**Steps:**
  1. Depuis l’inventaire, ouvrir le menu et cliquer sur About.
    - expect: Une navigation externe vers Sauce Labs About est effectuée.
    - expect: Aucune donnée du panier ni état de session ne doit être altéré avant la navigation.

#### 5.4. Reset App State

**File:** `tests/menu.spec.ts`

**Steps:**
  1. Ajouter un ou plusieurs produits, ouvrir le menu, puis sélectionner Reset App State.
    - expect: Le panier devient vide.
    - expect: Les badges sont supprimés.
    - expect: Les boutons Add to cart sont réinitialisés.
    - expect: L’utilisateur reste sur la page courante ou retourne à l’inventaire selon le comportement enregistré de l’application.

#### 5.5. Persistance du panier après rechargement

**File:** `tests/menu.spec.ts`

**Steps:**
  1. Ajouter un produit, recharger la page inventaire et vérifier le panier.
    - expect: Selon le stockage de la session, le panier est conservé s’il est disponible pour la même session.
    - expect: La quantité affichée correspond aux articles réellement conservés.

#### 5.6. Comportement avec utilisateur problème

**File:** `tests/menu.spec.ts`

**Steps:**
  1. Se connecter avec problem_user et parcourir l’inventaire et le panier.
    - expect: Le résultat est documenté comme comportement de ce profil, notamment les erreurs potentielles d’affichage, de retrait ou de checkout.
    - expect: Aucun plantage de l’application n’est acceptable sans détection explicite.
