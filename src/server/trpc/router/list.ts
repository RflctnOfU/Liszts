import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const listRouter = router({
  createList: protectedProcedure
    .input(
      z.object({
        // authorId: z.string().nullish(),
        name: z.string(),
      })
    )
    // TODO: figure out this mess why id is returning undefined
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { name } = input;

      const userId = await prisma.user.findFirst({
        where: {
          email: session.user.email != null ? session.user.email : undefined,
        },
      });
      if (userId) {
        console.log(userId);
      }
      return prisma.list.create({
        data: {
          name,
          authorId: userId != null ? userId.id : "",
          // author: {
          //   connect: {
          //     id: userId,
          //   },
          // },
        },
      });
    }),
  getLists: publicProcedure.query(async ({ ctx }) => {
    const { prisma, session } = ctx;
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email != null ? session?.user?.email : "",
      },
    });

    return await prisma.list.findMany({
      where: {
        authorId: user?.id != null ? user.id : "",
      },
      include: {
        items: true,
      },
    });
  }),
  // getSingleList: publicProcedure
  //   .input(z.object({ id: z.string() }))
  //   .query(({ input }) => {
  //     return prisma?.list.findUnique({
  //       where: {
  //         id: input.id,
  //       },
  //     });
  //   }),
  deleteList: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;

      const user = await prisma.user.findUnique({
        where: {
          email: session?.user?.email != null ? session.user.email : "",
        },
      });

      const list = await prisma.list.findFirst({
        where: {
          authorId: user?.id != null ? user.id : undefined,
          name: input.name,
        },
      });
      return await prisma.list.delete({
        where: {
          id: list?.id,
        },
      });
    }),
});

export type ServerRouter = typeof listRouter;
