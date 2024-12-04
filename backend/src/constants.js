const cookiesOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict", // set to 'none' to enable cross-site cookie or normally set to 'strict'
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  // domain: "pos9.fourelementx.com",
  // domain: "localhost",
  path: "/",
};

export { cookiesOptions };
