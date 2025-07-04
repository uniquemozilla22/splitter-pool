import express from "express";
import cors from "cors";
import { GroupService } from "./services/Group";
// ...existing code...

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Middleware for Logging

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

// Import or define GroupService before using it

const groupService = new GroupService();

Router.get("/groups", (req, res) => {
  const groups = groupService.getAllGroups ? groupService.getAllGroups() : [];
  res.json(groups);
});

// @ts-ignore
Router.post("/create-group", (req, res) => {
  const { name } = req.body;
  const group = groupService.createGroup(name);
  res.json(group);
});
// @ts-ignore
Router.post("/add-user", (req: Router.Request, res: express.Response) => {
  const { groupId, name } = req.body;
  const user = groupService.addUser(groupId, name);
  if (!user) return res.status(404).json({ error: "Group not found" });
  res.json(user);
});
// @ts-ignore
Router.post("/contribute", (req: express.Request, res: express.Response) => {
  const { groupId, userId, amount } = req.body;
  const group = groupService.contribute(groupId, userId, amount);
  if (!group) return res.status(404).json({ error: "Group or user not found" });
  res.json(group);
});

// @ts-ignore
Router.post("/withdraw", (req: express.Request, res: express.Response) => {
  const { groupId, userId, amount } = req.body;
  const group = groupService.withdraw(groupId, userId, amount);
  if (!group)
    return res
      .status(400)
      .json({ error: "Insufficient funds or group/user not found" });
  res.json(group);
});

// @ts-ignore
Router.get("/group/:groupId", (req: express.Request, res: express.Response) => {
  const group = groupService.getGroup(req.params.groupId);
  if (!group) return res.status(404).json({ error: "Group not found" });
  res.json(group);
});

// @ts-ignore
Router.post("/login", (req: express.Request, res: express.Response) => {
  const { username } = req.body;
  if (!username || typeof username !== "string") {
    return res.status(400).json({ error: "Username is required" });
  }
  // For demo: generate a fake user id based on username (or use a real user service)
  const userId = Buffer.from(username).toString("base64");
  res.json({ user: username, userId });
});

app.use("/api", Router);

app.get("/", (req, res) => {
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
