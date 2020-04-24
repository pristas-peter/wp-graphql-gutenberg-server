const { formatError } = require("../src");

function response({ body, statusCode }) {
  return {
    statusCode: 400,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

exports.wrapHandler = (handler) => async (event, context) => {
  try {
    if (event.httpMethod !== "POST") {
      return response({
        statusCode: 400,
        body: formatError({ error: new Error("Wrong HTTP method") }),
      });
    }
    return response({
      statusCode: 200,
      body: await handler(event, context),
    });
  } catch (error) {
    return response({
      statusCode: 500,
      body: formatError({ error }),
    });
  }
};
