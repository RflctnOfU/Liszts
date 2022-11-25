import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { userRouter } from "./user";
import { listRouter } from "./list";
import { itemRouter } from "./item";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  userRouter: userRouter,
  listRouter: listRouter,
  itemRouter: itemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
