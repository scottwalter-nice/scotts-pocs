import { expect, test } from "@playwright/test";


test.describe.serial('Testing 123...', () => {
    test("A", async ({ page }, { retry }) => {
      if (retry === 1) {
        throw new Error("oh!");
      }

      expect(true).toBe(true);
    });

    test("B", async ({ page }, { retry }) => {
      throw new Error("oh!");
    });
});
