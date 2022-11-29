import { contextProps } from "@trpc/react-query/dist/internals/context";
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
  getLists: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.list.findMany({
      where: {
        authorId: ctx.session?.user?.id,
      },
      include: {
        items: true,
      },
    });
  }),
  getSingleList: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return prisma?.list.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});

export type ServerRouter = typeof listRouter;
