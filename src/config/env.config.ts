export const EnvConfiguration = () => ({
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3001,
  defaultLimit: +process.env.DEFAULT_LIMIT || 10,
  defaultPage: +process.env.DEFAULT_PAGE || 1,
});
