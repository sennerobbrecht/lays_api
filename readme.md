🟦 USER ROUTES

Prefix: /api/v1/user

✔ Register
POST /api/v1/user/register

✔ Login
POST /api/v1/user/login

🟨 BAG ROUTES

Prefix: /api/v1/bag

✔ Get all bags
GET /api/v1/bag

✔ Get bag by ID
GET /api/v1/bag/:id

✔ Create bag (auth required)
POST /api/v1/bag

✔ Update bag (auth required)
PUT /api/v1/bag/:id

✔ Delete bag (admin required)
DELETE /api/v1/bag/:id

🟩 VOTE ROUTES

Prefix: /api/v1/vote

✔ Vote for a bag (auth required)
POST /api/v1/vote/:bagId

✔ Remove vote (auth required)
DELETE /api/v1/vote/:bagId

✔ Get ALL votes (admin required)
GET /api/v1/vote

🟥 AUTH HEADERS

Voor ALLE routes die auth vereisen:

Authorization: Bearer <JWT_TOKEN>


Voor admin routes moet isAdmin = true staan in de token.