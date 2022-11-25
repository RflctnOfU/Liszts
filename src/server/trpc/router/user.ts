import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const userRouter = router({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
        },
      });
    }),
  getUser: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: ctx.session?.user?.id,
      },
      include: {
        lists: {
          include: {
            items: true,
          },
        },
      },
    });
  }),
});

export type ServerRouter = typeof userRouter;
