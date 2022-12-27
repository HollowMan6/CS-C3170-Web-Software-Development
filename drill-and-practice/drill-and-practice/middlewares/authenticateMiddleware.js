const restrictedPaths = ["/quiz", "/topics"];

const authenticateMiddleware = async (context, next) => {
  const user = await context.state.session.get("user");

  if (!user && restrictedPaths.some((path) =>context.request.url.pathname.startsWith(path))) {
    context.response.redirect("/auth/login");
  } else {
    await next();
  }
};

export { authenticateMiddleware };
