export default {
  routes: [
    {
      method: "PUT",
      path: "/user-profile/update",
      handler: "user-profile.update",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
