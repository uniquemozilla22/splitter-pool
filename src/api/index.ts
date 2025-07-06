import express from "express";
import cors from "cors";
import { GroupService } from "../services/Group";
import { UserService } from "../services/User";
import authMiddleware from "./middleware/auth.middleware";
import path from "path";

const app = express();
const port = 3001;

app.use(
  cors({
    // allowedHeaders: ["Content-Type", "Authorization"],
    // methods: ["GET", "POST", "PUT", "DELETE"],
    // origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use((req, res, next) => {
  const log = {
    time: new Date().toISOString(),
    method: req.method,
    path: req.originalUrl,
    params: req.params,
    query: req.query,
    body: req.body,
    clientIp: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
  };
  console.log(
    "\x1b[33m[API LOG]\x1b[0m",
    "\x1b[33m" + JSON.stringify(log, null, 2) + "\x1b[0m"
  );
  next();
});

const Router = express.Router();

const groupService = new GroupService();
const userService = new UserService();

Router.get("/groups", authMiddleware, async (_req, res) => {
  try {
    const groups = await groupService.getAllGroups();
    res.json(groups);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

// @ts-ignore
Router.post("/create-group", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = (req as any).user;
    const group = await groupService.createGroup(name, id);
    res.json(group);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

Router.get("/users", authMiddleware, (req, res) => {
  const users = userService.getAllUsers();
  res.json(users);
});

// @ts-ignore
Router.get("/create-users", authMiddleware, async (req, res) => {
  try {
    const user = await userService.createUser("Test User");
    if (!user) return res.status(404).json({ error: "No user created" });
    res.json(user);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});
// @ts-ignore
Router.post(
  "/add-user",
  authMiddleware,
  // @ts-ignore

  (req: express.Request, res: express.Response) => {
    const { groupId, name } = req.body;
    const user = groupService.addUser(groupId, name);
    if (!user) return res.status(404).json({ error: "Group not found" });
    res.json(user);
  }
);
Router.post(
  "/contribute",
  authMiddleware,
  // @ts-ignore
  (req: express.Request, res: express.Response) => {
    const { groupId, userId, amount } = req.body;
    const group = groupService.contribute(groupId, userId, amount);
    if (!group)
      return res.status(404).json({ error: "Group or user not found" });
    res.json(group);
  }
);

// @ts-ignore
Router.post(
  "/withdraw",
  authMiddleware,
  // @ts-ignore
  (req: express.Request, res: express.Response) => {
    const { groupId, userId, amount } = req.body;
    const group = groupService.withdraw(groupId, userId, amount);
    if (!group)
      return res
        .status(400)
        .json({ error: "Insufficient funds or group/user not found" });
    res.json(group);
  }
);

Router.get(
  "/group/:groupId",
  authMiddleware,
  // @ts-ignore
  async (req: express.Request, res: express.Response) => {
    const group = await groupService.getGroup(req.params.groupId);
    if (!group) return res.status(404).json({ error: "Group not found" });
    res.json(group);
  }
);

// @ts-ignore
Router.post("/login", async (req: express.Request, res: express.Response) => {
  const { username } = req.body;
  if (!username || typeof username !== "string") {
    return res.status(400).json({ error: "Username is required" });
  }
  const user = await userService.getUser(username);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json({
    user,
    message: "Login successful",
  });
});

app.use("/api", Router);

app.get("/routes-api", (req, res) => {
  // Get routes from the Router stack
  const routes = Router.stack
    .filter((layer: any) => layer.route)
    .map((layer: any) => {
      const route = layer.route;
      const method = Object.keys(route.methods)[0].toUpperCase();
      return {
        method,
        path: "/api" + route.path,
      };
    });

  res.json({
    message: "Welcome to the Splitter Pool API!",
    availableRoutes: routes,
  });
});

// Serve static files from the React build directory
// app.use(express.static(path.join(__dirname, "../../client/dist")));

// const pathFile = path.join(__dirname, "../../client/dist/index.html");
// Handle all other routes by serving the React index.html
// app.get("*", (_req, res) => {
//   try {
//     res.sendFile(pathFile, (err) => {
//       if (err) {
//         console.error("Error serving index.html:", err);
//         res.status(500).send("Internal Server Error");
//       }
//     });
//   } catch (error) {
//     console.error("Error serving index.html:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
