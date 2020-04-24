const puppeteer = require("puppeteer");

const { blockTypes } = require("../../../src");
const { wrapHandler } = require("../../utils");

const launch = puppeteer.launch({ headless: true });

exports.handler = wrapHandler(async (event) =>
  blockTypes({ browser: await launch, ...event.body })
);
