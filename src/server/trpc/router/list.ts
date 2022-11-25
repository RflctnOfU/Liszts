import { list } from "postcss";
import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const listRouter = router({
  createList: publicProcedure
    .input(
      z.object({
        authorId: z.string().nullish(),
        name: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.list.create({
        data: {
          authorId: input.authorId,
          name: input.name,
        },
      });
    }),
  getList: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.list.findFirst({
      where: {
        authorId: ctx.session?.user?.id,
      },
    });
  }),
});

export type ServerRouter = typeof listRouter;
