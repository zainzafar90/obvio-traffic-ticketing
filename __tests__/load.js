import http from "k6/http";
import { sleep, check } from "k6";

const VIRTUAL_USERS = 10;
const DURATION = "10m";

export const options = {
  vus: VIRTUAL_USERS,
  duration: DURATION,
  thresholds: {
    http_req_duration: ["p(95)<1000"], // 95% of requests should be below 1000ms
    "http_req_duration{name:login}": ["p(95)<1000"],
    "http_req_duration{name:getRandomEvent}": ["p(95)<1000"],
    "http_req_duration{name:updateEvent}": ["p(95)<1000"],
  },
};

// You can customize these test credentials
const TEST_EMAIL = `admin@obvio.ai`;
const TEST_PASSWORD = "securePassword123";
const API_BASE_URL = "http://localhost:3000/v1";

export default function () {
  let eventId;

  // Step 1: Login
  const loginPayload = JSON.stringify({
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
  });

  const loginParams = {
    headers: {
      "Content-Type": "application/json",
    },
    tags: { name: "login" },
  };

  const loginResponse = http.post(
    `${API_BASE_URL}/account/login`,
    loginPayload,
    loginParams
  );

  check(loginResponse, {
    "login status is 200": (r) => r.status === 200,
  });

  if (loginResponse.status === 200) {
    // Step 2: Get Random Event
    const eventParams = {
      headers: {
        "Content-Type": "application/json",
      },
      tags: { name: "getRandomEvent" },
      credentials: "include",
    };

    const randomEventResponse = http.get(
      `${API_BASE_URL}/events/random`,
      eventParams
    );

    check(randomEventResponse, {
      "get random event status is 200": (r) => r.status === 200,
      "random event has id": (r) => r.json("id") !== undefined,
    });

    if (randomEventResponse.status === 200) {
      eventId = randomEventResponse.json("id");
      // Step 3: Update Event
      const reasons = [
        "falsePositive",
        "mainCameraIssue",
        "licensePlateIssue",
        "dmvInformationIssue",
      ];
      const statuses = ["approved", "rejected"];

      const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];

      const updatePayload = JSON.stringify({
        reason: randomReason,
        status: randomStatus,
      });
      const updateParams = {
        headers: {
          "Content-Type": "application/json",
        },
        tags: { name: "updateEvent" },
        credentials: "include",
      };
      const updateResponse = http.patch(
        `${API_BASE_URL}/events/${eventId}`,
        updatePayload,
        updateParams
      );
      check(updateResponse, {
        "update event status is 200": (r) => r.status === 200,
        "event was updated": (r) =>
          r.json("success") === true || r.status === 200,
      });
    }
  }

  sleep(1);
}
