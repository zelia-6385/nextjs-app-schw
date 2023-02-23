/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      swcMinify: true,
      env: {
        mongodb_username: "zelia6385",
        mongodb_password: "itenorio85",
        mongodb_clustername: "cluster0",
        mongodb_database: "events",
      },
    };
  }

  return {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      mongodb_username: "zelia6385",
      mongodb_password: "itenorio85",
      mongodb_clustername: "cluster0",
      mongodb_database: "events-prod",
    },
  };
};

module.exports = nextConfig;
