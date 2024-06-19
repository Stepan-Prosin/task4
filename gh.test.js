let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1',{ timeout: 50000 });
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  },50000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
      timeout: 50000
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  });
});
async function findelelement(word){
  const signInLink = await page.evaluate((searchWord) => {
    const elements = Array.from(document.querySelectorAll('a'));
    const signInElement = elements.find(element => element.textContent.includes(searchWord));
    return signInElement.href;
  }, word);
  return signInLink;
}
test("Sign in to GitHub'", async () => {
  const signInLink = await findelelement("Sign in");  
  await page.goto(signInLink);
  await page.waitForSelector('h1',{ timeout: 50000 });
  const title2 = await page.title();
  expect(title2).toEqual('Sign in to GitHub · GitHub');
});

test("GitHub Enterprise", async () => {
  const signInLink = await findelelement("Learn more about GitHub Enterprise");  
  await page.goto(signInLink);
  await page.waitForSelector('#hero-section-brand-heading',{ timeout: 50000 });
  const title2 = await page.title();
  expect(title2).toEqual('The AI Powered Developer Platform. · GitHub');
});

test("Compare all plans", async () => {
  const signInLink = await findelelement("Compare all plans");  
  await page.goto(signInLink);
  await page.waitForSelector('main h1',{ timeout: 50000 });
  const title2 = await page.title();
  expect(title2).toEqual('Get the complete developer');
});

