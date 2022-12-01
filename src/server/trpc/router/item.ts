import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { listRouter } from "./list";

export const itemRouter = router({
  createItem: protectedProcedure
    .input(
      z.object({
        listName: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email != null ? session.user.email : undefined,
        },
      });
      const list = await prisma.list.findFirst({
        where: {
          authorId: user?.id != null ? user.id : "",
          name: input.listName,
        },
      });

      return await ctx.prisma.item.create({
        data: {
          authorId: list?.id,
          name: input.name,
        },
      });
    }),
  // getItem: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.item.findFirst({
  //     where: {},
  //   });
  // }),
  deleteItem: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;

      // const user = await prisma.user.findUnique({
      //   where: {
      //     email: session?.user?.email != null ? session.user.email : "",
      //   },
      // });

      // const list = await prisma.list.findFirst({
      //   where: {
      //     authorId: user?.id != null ? user.id : undefined,
      //     name: input.name,
      //   },
      // });
      // const item = await prisma.item.findFirst({
      //   where: {
      //     authorId: list?.id != null ? list.id : undefined,
      //     name: input.itemName,
      //   },
      // });
      return await prisma.item.delete({
        where: {
          id: input.id,
        },
      });
    }),
});

export type ServerRouter = typeof itemRouter;
