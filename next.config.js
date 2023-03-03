/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_APP_EMBED_BUILD_ENV: "local",
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: "hxFv4SaQVXv3tE_rhe5u9",
    NEXT_PUBLIC_LINE_CLIENT_ID: "FoQ_Ri8rKSXkHf82GRzZK",
    NEXT_PUBLIC_LOGIN_UPBOND_DOMAIN: "https://lzg2dndj.auth.dev.upbond.io",
    NEXT_PUBLIC_CLIENT_ID:
      "BGbtA2oA0SYvm1fipIPaSgSTPfGJG8Q6Ep_XHuZY9qQVW5jUXTMd0l8xVtXPx91aCmFfuVqTZt9CK79BgHTNanU",
    NEXT_PUBLIC_OPENLOGIN_URL: "https://login.dev.upbond.io",
    NEXT_PUBLIC_DID_SECRET_KEY: "8c1817ee29b508e0e5271379a582cc66",
    NEXT_PUBLIC_DID_CLIENT_ID:
      "576a597e28be9015b6e522040eeede2ad5ffd4edc1a2df55e04a6a8672e7865f",
  },
};

module.exports = nextConfig;
