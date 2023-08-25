# Fresh-Fetch E-Commerce Application

Welcome to the **Fresh-Fetch** project, an e-commerce application developed for a small grocery business to showcase products online and enable customers to make purchases. This application is designed to improve sales and enhance customer satisfaction by providing a simple and efficient shopping experience. The project stack includes React for the frontend, a .NET Core API using C# for backend functionality, and a SQL Server database to store data.

## Business Story

We have been contracted to create an e-commerce platform for a local grocery business aiming to expand their sales through online channels. The main objectives of this project are to present the product catalog effectively, allow customers to browse and search products, and provide a seamless shopping experience. The application is expected to boost sales and enhance customer satisfaction by offering a user-friendly interface.

## Requirements

The Fresh-Fetch application is expected to meet the following requirements:

### 1. Dashboard: Anonymous User View

- Anonymous users can see **Login** and **Signup** buttons in the application header.
- Users can view a list of products.
- Users can filter products by category and search by product name or description.
- Sorting options are available for the product list.
- Clicking on a product redirects the user to the product details page.

### 2. Signup and Login

#### Signup Screen

- Full Name: Maximum 50-character alphabets only.
- Email: Must be unique and in a valid format.
- Phone Number: Valid 10-digit format.
- Password: Minimum length is 8 characters, with at least 1 special character, 1 number, and 1 alphabet.
- Confirm Password: Should match the password.

#### Login

- Users can log in using a registered email and password.
- After successful login, users are directed to the dashboard.

### 3. Dashboard for Logged-in Users

- Logged-in users can see their **Full Name**, **View Cart**, **My Orders**, and **Sign-out** buttons in the header.
- All options available to anonymous users are also accessible to logged-in users.
- Users can add products to their cart, view their cart, and remove products from it.
- The cart page displays "No Items in Cart" if the cart is empty.
- Users can specify quantities and click "Add" on the product detail page to add items to the cart.
- If a product's available quantity is zero, "Out of Stock" is displayed instead of the "Add to Cart" button.
- The cart page features a "Place Order" button, generating a unique order ID upon clicking. The cart is refreshed, and product quantities are updated.

### 4. Dashboard for Admin Users

- Admin login redirects to the admin view.
- The application supports multiple admins based on the "isAdmin" flag in the database.
- After successful login, admins are directed to the admin product listing page, featuring edit and delete buttons for each product.
- Admins can add new products using the "Add Product" button in the header.

### Adding a New Product (Admin)

- Product Name: Maximum 100-character alphanumeric (required).
- Description: Maximum 255-character alphanumeric (required).
- Category: Maximum 100-character alphanumeric (required).
- Available Quantity: Numeric, required.
- Image: JPG or PNG format only, required.
- Price: Decimal, required.
- Discount: Decimal, optional.
- Specification (Weight, Size, etc.): Maximum 100-character alphanumeric, optional.

## Installation and Usage

To run the Fresh-Fetch application locally, follow these steps:

1. Clone the repository.
2. Navigate to the frontend directory and run `npm install` to install frontend dependencies.
3. Navigate to the backend directory and set up the .NET Core environment.
4. Configure the SQL Server database and update the connection string.
5. Run the application using appropriate commands for both frontend and backend.

## Contributors

Rishabh Dubey

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to contribute to this project by creating pull requests and reporting issues. Happy coding!
