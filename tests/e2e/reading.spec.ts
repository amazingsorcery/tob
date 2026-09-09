import { expect, test, type Page } from "@playwright/test";

/**
 * The things only a browser can answer.
 *
 * Everything in the Vitest suite is about the HTML: which ids exist, which equations became
 * display blocks, which stylesheet is linked. None of it can see a layout. These five
 * questions all needed a real engine, and four of them found a real defect the first time
 * they were asked:
 *
 *   - the measure was 94 characters, not 68, because `1ch` is the width of a zero and not of
 *     an average letter;
 *   - 31 of 42 display equations are wider than a phone;
 *   - the page must not scroll sideways even so;
 *   - a table-of-contents link has to actually move the viewport to its heading, and not to
 *     a point underneath the sticky header;
 *   - the scroll-spy has to name the section the reader is in.
 */

const MATHS_CHAPTER = "/three-lemmas/2-three-lemmas";
const PHILOSOPHY_CHAPTER = "/where-concepts-come-apart/3-concepts-and-their-functions";
const WIDE_TABLE_CHAPTER = "/kakeya-multiplicity/9-appendix-a-computations";

/** Horizontal overflow of the document itself, in pixels. Must always be zero. */
async function pageOverflow(page: Page): Promise<number> {
  return page.evaluate(() => {
    const doc = document.scrollingElement;
    return doc ? doc.scrollWidth - doc.clientWidth : 0;
  });
}

test.describe("the page never scrolls sideways", () => {
  for (const path of ["/", "/three-lemmas", MATHS_CHAPTER, PHILOSOPHY_CHAPTER, WIDE_TABLE_CHAPTER]) {
    test(`${path}`, async ({ page }) => {
      await page.goto(path);
      // A grid child defaults to a minimum width of its content, so an eleven-column table
      // widens the column, then the grid, then the document — and the body text goes with it.
      expect(await pageOverflow(page)).toBe(0);
    });
  }
});

test.describe("things wider than the screen scroll inside their own box", () => {
  test("display equations", async ({ page }) => {
    await page.goto(MATHS_CHAPTER);
    const measured = await page.evaluate(() =>
      [...document.querySelectorAll(".katex-display")].map((element) => ({
        overflow: element.scrollWidth - element.clientWidth,
        tabIndex: (element as HTMLElement).tabIndex,
        label: element.getAttribute("aria-label"),
      })),
    );
    expect(measured.length).toBeGreaterThan(5);
    // Every one is a tab stop, whether or not it overflows on this viewport — a container
    // that cannot be focused cannot be scrolled from the keyboard (WCAG 2.1.1).
    for (const equation of measured) {
      expect(equation.tabIndex).toBe(0);
      expect(equation.label).toBeTruthy();
    }
    expect(await pageOverflow(page)).toBe(0);
  });

  test("wide tables", async ({ page }) => {
    await page.goto(WIDE_TABLE_CHAPTER);
    const boxes = await page.evaluate(() =>
      [...document.querySelectorAll(".scroll-box")].map((element) => ({
        overflow: element.scrollWidth - element.clientWidth,
        tabIndex: (element as HTMLElement).tabIndex,
      })),
    );
    expect(boxes.length).toBeGreaterThan(0);
    for (const box of boxes) expect(box.tabIndex).toBe(0);
    expect(await pageOverflow(page)).toBe(0);
  });
});

test.describe("the measure", () => {
  test("holds 62 to 78 characters on a wide screen", async ({ page, isMobile }) => {
    test.skip(isMobile, "The measure is a constraint on a column wider than a phone.");
    await page.goto(PHILOSOPHY_CHAPTER);

    const characters = await page.evaluate(() => {
      const paragraph = document.querySelector<HTMLElement>(".prose > p");
      if (!paragraph) return 0;
      const style = getComputedStyle(paragraph);
      /*
       * The average advance of running English text in this exact face and size — NOT the
       * width of a zero, which is what `1ch` means and what made the column 94 characters
       * wide. The sample is ordinary prose so that spaces and capitals are weighted the way
       * they are on the page.
       */
      const sample =
        "Philosophy's central problems are notorious for their persistence, and the " +
        "questions of what knowledge is, whether we act freely, and what makes a person " +
        "the same person over time remain contested among careful and informed people.";
      const probe = document.createElement("span");
      probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre";
      probe.style.font = style.font;
      probe.style.letterSpacing = style.letterSpacing;
      probe.textContent = sample;
      document.body.append(probe);
      const advance = probe.getBoundingClientRect().width / sample.length;
      probe.remove();
      return Math.round(paragraph.getBoundingClientRect().width / advance);
    });

    // The target is ~70. The window is wide enough to survive a hinting difference between
    // engines and narrow enough to fail the 94 that `--measure: 68ch` produced.
    expect(characters).toBeGreaterThanOrEqual(62);
    expect(characters).toBeLessThanOrEqual(78);
  });
});

test.describe("the table of contents", () => {
  test("every link lands on its heading, clear of the sticky header", async ({ page }) => {
    await page.goto(MATHS_CHAPTER);

    const targets = await page.evaluate(() =>
      [...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute("href") ?? ""),
    );
    expect(targets.length).toBeGreaterThan(3);

    for (const href of targets) {
      const id = href.slice(1);
      // An attribute selector, not `#id`: every section id in this corpus begins with a
      // digit ("23-hasse-derivatives"), which is not a valid CSS identifier unescaped — and
      // `CSS.escape` does not exist in Node, only in the page.
      const heading = page.locator(`[id="${id}"]`);
      await expect(heading, `#${id} does not exist in the document`).toHaveCount(1);

      await page.evaluate((fragment) => {
        window.location.hash = fragment;
      }, href);
      await page.waitForTimeout(400);

      const box = await heading.boundingBox();
      expect(box, `#${id} has no box after navigating to it`).not.toBeNull();
      if (!box) continue;
      // Below the 3.5rem header — a heading that lands underneath it looks like a dead link —
      // and above the fold, which is what "the link worked" means to a reader.
      expect(box.y, `#${id} landed under the sticky header`).toBeGreaterThanOrEqual(48);
      expect(box.y, `#${id} landed off screen`).toBeLessThan(400);
    }
  });

  test("marks the section the reader is in", async ({ page, isMobile }) => {
    test.skip(isMobile, "The sticky rail is a wide-screen surface; mobile gets a disclosure.");
    await page.goto(MATHS_CHAPTER);

    const rail = page.getByRole("navigation", { name: /with your position/ });
    await expect(rail).toBeVisible();

    // Before scrolling, the first section is current.
    await expect(rail.locator('a[aria-current="true"]')).toHaveCount(1);
    const first = await rail.locator('a[aria-current="true"]').textContent();

    const headings = page.locator(".prose h2");
    const third = headings.nth(2);
    // `scrollIntoView({ block: "start" })`, not `scrollIntoViewIfNeeded`: the latter scrolls
    // the minimum distance, which can leave the heading at the FOOT of the viewport — below
    // the reading line, so the previous section is still correctly the current one.
    await third.evaluate((element) => {
      element.scrollIntoView({ block: "start", behavior: "instant" });
    });
    await page.mouse.wheel(0, 24);
    await page.waitForTimeout(300);

    const current = rail.locator('a[aria-current="true"]');
    await expect(current).toHaveCount(1);
    const now = await current.textContent();
    expect(now).not.toBe(first);
    expect(now?.trim()).toBe((await third.textContent())?.trim());
  });

  test("clicking a link in the rail makes that section current", async ({ page, isMobile }) => {
    /*
     * REGRESSION. `scroll-padding-top: 5rem` on <html> and `scroll-margin-top: 5.5rem` on the
     * headings both applied, and scroll padding and scroll margin ADD: a link landed its
     * heading 168px down the viewport, while the rail reads the position off a line at 120px.
     * Following the link to §2.3 therefore highlighted §2.2 in the list beside it — the two
     * halves of the same navigation disagreeing about where the reader was.
     */
    test.skip(isMobile, "The sticky rail is a wide-screen surface.");
    await page.goto(MATHS_CHAPTER);

    const rail = page.getByRole("navigation", { name: /with your position/ });
    const target = rail.locator("a").nth(3);
    const label = (await target.textContent())?.trim();
    await target.click();
    await page.waitForTimeout(500);

    await expect(rail.locator('a[aria-current="true"]')).toHaveText(label ?? "");
  });

  test("the mobile disclosure is closed until asked for", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(MATHS_CHAPTER);
    const disclosure = page.locator("details");
    await expect(disclosure).toHaveJSProperty("open", false);
    await disclosure.locator("summary").click();
    await expect(disclosure).toHaveJSProperty("open", true);
    // It must not then eat the screen: the chapter's first paragraph is still reachable.
    expect(await pageOverflow(page)).toBe(0);
  });
});

test.describe("keyboard and focus", () => {
  test("the skip link is the first stop and reaches the content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const focused = await page.evaluate(() => document.activeElement?.textContent ?? "");
    expect(focused).toContain("Skip to content");
    await page.keyboard.press("Enter");
    const landed = await page.evaluate(() => document.activeElement?.id ?? "");
    expect(landed).toBe("main");
  });

  test("focus moves to the heading after a navigation", async ({ page }) => {
    await page.goto("/three-lemmas");
    await page.getByRole("link", { name: "Start reading" }).click();
    await page.waitForURL(/\/three-lemmas\/1-/);
    await expect
      .poll(async () => page.evaluate(() => document.activeElement?.tagName ?? ""))
      .toBe("H1");
  });
});

test.describe("KaTeX is loaded per work, not globally", () => {
  test("a maths chapter requests the stylesheet", async ({ page }) => {
    await page.goto(MATHS_CHAPTER);
    await expect(page.locator('link[href="/katex/katex.min.css"]')).toHaveCount(1);
  });

  test("the philosophy chapter does not", async ({ page }) => {
    await page.goto(PHILOSOPHY_CHAPTER);
    await expect(page.locator('link[href*="katex"]')).toHaveCount(0);
    await expect(page.locator(".katex")).toHaveCount(0);
  });
});
