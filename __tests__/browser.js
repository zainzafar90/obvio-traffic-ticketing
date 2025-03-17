import { browser } from "k6/browser";
import { check } from "https://jslib.k6.io/k6-utils/1.5.0/index.js";

export const options = {
  scenarios: {
    ui: {
      executor: "shared-iterations",
      options: {
        browser: {
          type: "chromium",
        },
      },
    },
  },
  thresholds: {
    checks: ["rate==1.0"],
  },
};

export default async function () {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto("http://localhost:4000/");

    await page.locator('input[name="email"]').type("admin@obvio.ai");
    await page.locator('input[name="password"]').type("securePassword123");

    await Promise.all([
      page.waitForNavigation(),
      page.locator('button[type="submit"]').click(),
    ]);

    await check(page.locator('[data-testid="video-controls"]'), {
      header: async (videoControls) =>
        (await videoControls.textContent()) === "Play Video",
    });

    await page.locator('[data-testid="video-controls"]').click();

    await check(page.locator('[data-testid="video-controls"]'), {
      header: async (videoControls) =>
        (await videoControls.textContent()) === "Pause Video",
    });
  } finally {
    await page.close();
  }
}
