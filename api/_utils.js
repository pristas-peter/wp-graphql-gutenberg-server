exports.wrapHandler = (handler) => async (req, res) => {
  try {
    if (request.method !== "POST") {
      res.status(400);
      res.json(formatError({ error: new Error("Wrong HTTP method") }));
      return;
    }
    res.send(await handler(req));
  } catch (error) {
    res.status(500);
    res.json(formatError({ error }));
  }
};
