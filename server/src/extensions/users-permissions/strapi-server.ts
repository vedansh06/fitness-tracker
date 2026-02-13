module.exports = (plugin) => {
  plugin.controllers.user.updateMe = async (ctx) => {
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
      } = updatedUser;

      ctx.body = sanitizedUser;
    } catch (error) {
      ctx.badRequest("Failed to update profile", { error: error.message });
    }
  };

  plugin.routes["content-api"].routes.push({
    method: "PUT",
    path: "/users/me",
    handler: "user.updateMe",
    config: {
      prefix: "",
      policies: [],
    },
  });

  return plugin;
};
