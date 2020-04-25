const { ArgumentParser } = require("argparse");
const express = require("express");
const puppeteer = require("puppeteer");
const {
  formatError,
  batch,
  blockTypes,
  ServerError,
} = require("wp-graphql-gutenberg-server-core");

const { version, description } = require("../package.json");

const parser = new ArgumentParser({
  version,
  addHelp: true,
  description,
});

parser.addArgument(["--host"], {
  help: "host to bind to",
  defaultValue: "0.0.0.0",
});
parser.addArgument(["--port"], {
  help: "port to bind to",
  type: "int",
  defaultValue: 5000,
});

const args = parser.parseArgs();
const app = express();

const launch = puppeteer.launch({ headless: true });

app.use(express.json());

app.use(async (req, res) => {
  let context = null;
  try {
    if (req.method !== "POST") {
      throw new ServerError("Wrong HTTP method", 400);
    }

    const browser = await launch;
    context = await browser.createIncognitoBrowserContext();

    switch (req.path) {
      case "/batch":
        res.send(await batch({ ...req.body, browser: context }));
        break;
      case "/block-types":
        res.send(await blockTypes({ ...req.body, browser: context }));
        break;
      default:
        throw new ServerError(`Unknown resource ${req.path}`, 400);
    }
  } catch (error) {
    res.status(error.status || 500);
    res.send(formatError({ error }));
  } finally {
    if (context !== null) {
      context.close();
    }
  }
});

const { host, port } = args;

app.listen(port, host, (error) => {
  if (error) {
    throw error;
  }

  console.info(`✅ Server started. 🚀 Listening on http://${host}:${port}`);
});
