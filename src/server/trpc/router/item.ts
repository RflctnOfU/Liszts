import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { listRouter } from "./list";

export const itemRouter = router({
  createItem: publicProcedure
    .input(
      z.object({
        authorId: z.string().nullish(),
        name: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.item.create({
        data: {
          authorId: input.authorId,
          name: input.name,
        },
      });
    }),
  // getItem: publicProcedure.query(({ctx}) => {
  //     return ctx.prisma.item.findFirst({
  //         where: {

  //         }
  //     })
  // })
});

export type ServerRouter = typeof itemRouter;
