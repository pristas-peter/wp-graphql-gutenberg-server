const evaluate = async ({
  browser,
  cookies = [],
  url,
  pageFunction,
  pageFunctionOptions,
}) => {
  const context = await browser.createIncognitoBrowserContext();
  try {
    const page = await context.newPage();
    await page.setCookie(...cookies);
    await page.goto(url, { waitUntil: `domcontentloaded` });

    await page.evaluate(async () => {
      await window.wp.wpGraphqlGutenberg.server.blockEditorReady();
    });

    return await page.evaluate(pageFunction, pageFunctionOptions);
  } finally {
    await context.close();
  }
};

exports.batch = async ({ browser, cookies, url, contentById }) => {
  return await evaluate({
    browser,
    cookies,
    url,
    pageFunction: async (options) => {
      const { createBatch } = window.wp.wpGraphqlGutenberg.server;
      return createBatch(options);
    },
    pageFunctionOptions: {
      contentById,
    },
  });
};

exports.blockTypes = async ({ browser, cookies, url }) => {
  return await evaluate({
    browser,
    cookies,
    url,
    pageFunction: async () => {
      const { getBlockRegistry } = window.wp.wpGraphqlGutenberg.server;
      return getBlockRegistry();
    },
  });
};
