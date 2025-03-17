import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import { Pool } from "pg";
import { events, users, accounts } from "./schema";

// Load environment variables
config();

if (!process.env.DB_URL) {
  throw new Error("DB_URL is not set");
}

const NUMBER_OF_USERS = 1;
const NUMBER_OF_EVENTS = 1000000;

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

const schema = {
  users,
  events,
  accounts,
};

const db = drizzle(pool, { schema });

const main = async () => {
  const hashedPassword =
    "$2a$08$1DdxLqST2pLfpcdOZZ.eRuWJ1H/DGD33e8RK5jilXHUICxPXsnJIK"; // securePassword123
  const userId = "00509c3e-b8fb-4fd4-7ba2-247b576e1515";

  await seed(db, schema).refine((funcs) => ({
    users: {
      count: NUMBER_OF_USERS,
      columns: {
        id: funcs.default({ defaultValue: userId }),
        name: funcs.fullName(),
        email: funcs.weightedRandom([
          {
            value: funcs.default({ defaultValue: "admin@obvio.ai" }),
            weight: 1,
          },
        ]),
        password: funcs.default({ defaultValue: hashedPassword }),
        role: funcs.valuesFromArray({ values: ["user"] }),
      },
    },
    accounts: {
      count: NUMBER_OF_USERS,
      columns: {
        userId: funcs.default({ defaultValue: userId }),
        provider: funcs.default({ defaultValue: "password" }),
        providerAccountId: funcs.uuid(),
        blacklisted: funcs.default({ defaultValue: false }),
      },
    },
    events: {
      count: NUMBER_OF_EVENTS,
      columns: {
        reviewerId: funcs.default({ defaultValue: null }),
        videoUrl: funcs.valuesFromArray({
          values: [
            "/violations/violation-1.mp4",
            "/violations/violation-2.mp4",
            "/violations/violation-3.mp4",
            "/violations/violation-4.mp4",
            "/violations/violation-5.mp4",
            "/violations/violation-6.mp4",
            "/violations/violation-7.mp4",
            "/violations/violation-8.mp4",
            "/violations/violation-9.mp4",
            "/violations/violation-10.mp4",
            "/violations/violation-11.mp4",
            "/violations/violation-12.mp4",
            "/violations/violation-13.mp4",
            "/violations/violation-14.mp4",
            "/violations/violation-15.mp4",
            "/violations/violation-16.mp4",
            "/violations/violation-17.mp4",
          ],
        }),
        licensePlateImageUrl: funcs.valuesFromArray({
          values: [
            "/license-plates/license-plate-1.jpg",
            "/license-plates/license-plate-2.jpg",
            "/license-plates/license-plate-3.jpg",
            "/license-plates/license-plate-4.jpg",
            "/license-plates/license-plate-5.jpg",
            "/license-plates/license-plate-6.jpg",
            "/license-plates/license-plate-7.jpg",
            "/license-plates/license-plate-8.jpg",
          ],
        }),
        status: funcs.valuesFromArray({
          values: ["idle", "pending", "closed"],
        }),
        violationSeverity: funcs.valuesFromArray({
          values: ["low", "medium", "high", "critical"],
        }),
        location: funcs.valuesFromArray({
          values: [
            "123 Main St, Anytown, USA",
            "456 Maple Ave, Othertown, USA",
            "789 Oak St, Somewhere, USA",
            "101 Pine St, Anycity, USA",
            "202 Cedar St, Othercity, USA",
            "303 Birch St, Somewhere, USA",
            "404 Maple Ave, Othertown, USA",
            "505 Oak St, Somewhere, USA",
            "606 Pine St, Anycity, USA",
            "707 Cedar St, Othercity, USA",
            "808 Birch St, Somewhere, USA",
          ],
        }),
      },
    },
  }));
};

main();
