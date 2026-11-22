# Snapzo

Snapzo is a food-ordering application backend built with **Node.js**, **Express**, **MongoDB**, and **Stripe**. It provides APIs for user accounts, food catalog management, carts, and order processing, plus a React/Vite admin dashboard for managing food items and orders.

## Features

- User registration and login with JWT authentication
- Password hashing with bcrypt
- Food item creation, listing, image uploads, and removal
- Per-user shopping carts
- Online payments through Stripe Checkout
- Cash-on-delivery orders
- Order history and order-status management
- CORS-enabled REST API
- React/Vite admin dashboard

## Project structure

```text
.
├── admin/              # React/Vite administration dashboard
├── config/             # Database connection
├── controllers/        # Request handlers
├── middlewares/        # JWT authentication middleware
├── models/             # Mongoose schemas
├── routes/             # Express API routes
├── uploads/            # Uploaded food images
├── server.js           # Application entry point
└── vercel.json         # Vercel deployment configuration
```

## Requirements

- Node.js 18+
- MongoDB database
- Stripe account and secret key (required for online payments)

## Backend setup

```bash
git clone https://github.com/CoderNasim2023/Snapzo_Backend.git
cd Snapzo_Backend
npm install
```

Create a `.env` file in the project root:

```env
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_SECRET=replace-with-a-long-random-secret
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
```

Start the API:

```bash
npm run dev
```

The server runs on `http://localhost:4000` by default. A successful request to `/` returns `Backend is working`.

## API reference

### Users

| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| `POST` | `/api/user/register` | Register a user | No |
| `POST` | `/api/user/login` | Log in and receive a JWT | No |

### Food

| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| `POST` | `/api/food/add` | Add a food item using multipart field `image` | No |
| `GET` | `/api/food/list` | List all food items | No |
| `POST` | `/api/food/remove` | Remove a food item using body field `id` | No |
| `GET` | `/images/<filename>` | Serve an uploaded image | No |

### Cart

Send the JWT in the `token` request header.

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/cart/get` | Get the authenticated user's cart |
| `POST` | `/api/cart/add` | Add an item to the cart |
| `POST` | `/api/cart/remove` | Remove an item from the cart |

### Orders

| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| `GET` | `/api/order/list` | List all orders | No |
| `POST` | `/api/order/userorders` | List orders for the authenticated user | Yes |
| `POST` | `/api/order/place` | Create an online-payment order | Yes |
| `POST` | `/api/order/placecod` | Create a cash-on-delivery order | Yes |
| `POST` | `/api/order/verify` | Verify or remove a Stripe order | No |
| `POST` | `/api/order/status` | Update an order status | No |

Example registration request:

```bash
curl -X POST http://localhost:4000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alex","email":"alex@example.com","password":"password123"}'
```

Example authenticated request:

```bash
curl -X POST http://localhost:4000/api/cart/get \
  -H "Content-Type: application/json" \
  -H "token: <jwt-token>" \
  -d '{}'
```

## Admin dashboard

The dashboard is located in `admin/` and provides screens for adding food, viewing/removing food, and updating order statuses.

```bash
cd admin
npm install
npm run dev
```

The dashboard currently uses the backend URL configured in its React source. Update that URL for your local or deployed API before using the dashboard.

## Deployment

The backend includes `vercel.json` for Vercel deployments. Configure the same environment variables from the setup section in the Vercel project settings, and ensure the MongoDB deployment allows connections from the deployed application.

## License

This project is released under the ISC license.
