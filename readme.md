src/
├── app.ts                # Express App configuration
├── server.ts             # Server entry & DB Connection
├── app/
│   ├── config/           # App Configuration (dotenv, etc)
│   ├── middlewares/      # Global Error Handler, Auth, etc
│   ├── modules/          # Core Business Logic (User, Product, etc)
│   │   └── user/         # User Module
│   │       ├── user.controller.ts
│   │       ├── user.route.ts
│   │       ├── user.service.ts
│   │       ├── user.validation.ts
│   │       └── user.interface.ts
│   ├── routes/           # Central Route Handler
│   └── utils/            # catchAsync, sendResponse, AppError
└── db/                   # Database Pool configuration
