const puppeteer = require("puppeteer");

const { batch } = require("../../../src");
const { wrapHandler } = require("../../utils");

const launch = puppeteer.launch({ headless: true });

exports.handler = wrapHandler(async (event) =>
  batch({ browser: await launch, ...event.body })
);
