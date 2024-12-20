import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { rateLimit } from 'express-rate-limit'

const __dirname = path.resolve();
const app = express();
// app.use(
//   cors({
//     // must include credentials: true in frontend while using fetch method if you want to set cookie in browser- crediential :true inserver side cors option
//     //also must set cors origin if frontend is on deferent server
//     // origin: process.env.CORS_ORIGIN,
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );

const allowedOrigins = [
  "http://localhost:5173", // Add your local development front-end
  "http://localhost:3512", // Add your local development front-end
  "http://192.168.0.190:5173",
  "https://property-rent-fullstack.onrender.com"
  
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);  // Allow the request
      } else {
        callback(new Error("Not allowed by CORS"), false);  // Reject the request
      }
    },
    credentials: true,  // Allow cookies and credentials
  })
);




app.use(cookieParser());

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
});
app.use(limiter);


// Import Routes
import userRouter from "./routes/user.routes.js";
import listingRouter from "./routes/listing.routes.js";
import commentRouter from "./routes/comment.routes.js";
import wishlistRouter from "./routes/wishlist.routes.js";
import chatRouter from "./routes/chat.routes.js";
import conversationRouter from "./routes/conversation.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import categoryRouter from "./routes/category.routes.js";



//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/listings", listingRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/conversations", conversationRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/category", categoryRouter);

// Always write bellow the all Routes
// Serve static files
app.use(express.static("public"));

// Always write bellow the all Routes
// Catch all route
app.get("/*", (req, res) => {
  // ('Route hit:', req.url);
  res.sendFile(__dirname + "/public/index.html");
});


// Error Handling Middleware which send error in json.
//it must be put at the end of all routes and middlewares before export.
// if no parameter is being used you can set that as _ .if multipple params than you cannot use _ multiple times.instead use __
app.use(function (err, _, res, __) {
  const statusCode = err.statusCode || 500;
  const response = {
    statusCode,
    message: err.message || "Internal Server Error",
    success: false,
  };

  return res.status(statusCode).json(response);
});


export { app };
