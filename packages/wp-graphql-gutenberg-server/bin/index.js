const { ArgumentParser } = require("argparse");
const express = require("express");
const puppeteer = require("puppeteer");
const {
  formatError,
  batch,
  blockTypes,
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

app.post("/batch", async (req, res) => {
  try {
    res.send(await batch({ ...req.body, browser: await launch }));
  } catch (error) {
    res.status(500);
    res.send(formatError({ error }));
  }
});

app.post("/block-types", async (req, res) => {
  try {
    res.send(await blockTypes({ ...req.body, browser: await launch }));
  } catch (error) {
    res.status(500);
    res.send(formatError({ error }));
  }
});

const { host, port } = args;

app.listen(port, host, (error) => {
  if (error) {
    throw error;
  }

  console.info(`✅ Server started. 🚀 Listening on http://${host}:${port}`);
});
