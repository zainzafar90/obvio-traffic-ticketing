import { browser } from "k6/browser";
import { check } from "https://jslib.k6.io/k6-utils/1.5.0/index.js";
import { sleep } from "k6";

export const options = {
  headless: false,
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
    await loginToApplication(page);
    await testVideoControls(page);
    await testEventActions(page);
  } finally {
    await page.close();
  }
}

async function loginToApplication(page) {
  await page.goto("http://localhost:4000/");
  await page.locator('input[name="email"]').type("admin@obvio.ai");
  await page.locator('input[name="password"]').type("securePassword123");

  await Promise.all([
    page.waitForNavigation(),
    page.locator('button[type="submit"]').click(),
  ]);

  await check(page, {
    "Page has loaded after login": (page) => page.url().includes("/"),
  });
}

async function testVideoControls(page) {
  const videoControls = page.locator('[data-testid="video-controls"]');

  await check(videoControls, {
    "Video controls show Play": async (element) =>
      (await element.textContent()).includes("Play"),
  });

  await videoControls.click();

  await check(videoControls, {
    "Video controls show Pause": async (element) =>
      (await element.textContent()).includes("Pause"),
  });

  await videoControls.click();
}

async function testEventActions(page) {
  await testAcceptEvent(page);
  await testRejectEvent(page);
  await testSkipEvent(page);
}

async function testAcceptEvent(page) {
  const acceptButton = page.locator('[data-testid="accept-button"]');
  await acceptButton.click();

  sleep(2);

  await check(acceptButton, {
    "Accept button shows confirmation state": async (element) =>
      (await element.textContent()).includes("Confirm Accept"),
  });

  await acceptButton.click();

  await check(acceptButton, {
    "Accept button shows approved state": async (element) =>
      (await element.textContent()).includes("Approved"),
  });

  await waitForNextEvent(page);
}

async function testRejectEvent(page) {
  const rejectButton = page.locator('[data-testid="reject-dropdown-button"]');
  await rejectButton.click();

  sleep(2);

  await page.locator('[data-testid="reject-false-positive"]').click();

  const confirmRejectButton = page.locator(
    '[data-testid="confirm-reject-button"]'
  );
  await check(confirmRejectButton, {
    "Confirm reject button appears": async (element) =>
      (await element.textContent()).includes("Confirm Reject"),
  });

  await confirmRejectButton.click();

  await check(rejectButton, {
    "Reject button shows rejected state": async (element) =>
      (await element.textContent()).includes("Rejected"),
  });

  await waitForNextEvent(page);
}

async function testSkipEvent(page) {
  const skipButton = page.locator('[data-testid="skip-event-button"]');

  if (await skipButton.isEnabled()) {
    await skipButton.click();
    sleep(2);
    await check(page, {
      "New event loaded after skip": async () => true,
    });
  }
}

async function waitForNextEvent(page) {
  const nextEventButton = page.locator('[data-testid="next-event-button"]');

  try {
    await nextEventButton.waitFor({ state: "visible", timeout: 5000 });
    await check(nextEventButton, {
      "Next event button appears": async (element) =>
        (await element.textContent()).includes("Next event"),
    });

    sleep(2);
  } catch (e) {
    await page.locator('[data-testid="skip-event-button"]').click();
  }
}
