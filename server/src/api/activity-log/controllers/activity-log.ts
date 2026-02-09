/**
 * activity-log controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::activity-log.activity-log",
  ({ strapi }) => ({
    async create(ctx) {
      const user = ctx.state.user;

      if (!user) return ctx.unauthorized("Login required");
      const body = ctx.request.body.data;
      body.users_permissions_user = user.id;

      const entry = await strapi.entityService.create(
        "api::activity-log.activity-log",
        {
          data: body,
          populate: ["users_permissions_user"],
        },
      );
      return entry;
    },
  }),
);
