module.exports = {
  apps: [
    {
      name: "server",
      script: "./dist/server.js",
      instances: "1",
    },
  ],
  env: {
    NODE_ENV: "development",
  },
  env_production: {
    NODE_ENV: "production",
  },

  // deploy: {
  // production: {
  //   user: "SSH_USERNAME",
  //   host: "SSH_HOSTMACHINE",
  //   ref: "origin/master",
  //   repo: "GIT_REPOSITORY",
  //   path: "DESTINATION_PATH",
  //   "pre-deploy-local": "",
  //   "post-deploy":
  //     "npm install && pm2 reload ecosystem.config.js --env production",
  //   "pre-setup": "",
  // },
  // },
};
