import { Context } from "koa";

export default {
  async update(ctx: Context) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("You must be logged in to update your profile");
    }

    const userId = user.id;
    const data = ctx.request.body;

    delete data.role;
    delete data.provider;
    delete data.confirmed;
    delete data.blocked;
    delete data.resetPasswordToken;
    delete data.confirmationToken;
    delete data.password;

    try {
      const updatedUser = await strapi.entityService.update(
        "plugin::users-permissions.user",
        userId,
        { data },
      );

      const {
        password,
        resetPasswordToken,
        confirmationToken,
        ...sanitizedUser
      } = updatedUser as any;

      ctx.body = sanitizedUser;
    } catch (error: any) {
      ctx.throw(400, "Failed to update profile: " + error.message);
    }
  },
};
