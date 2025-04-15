//Задача 1

let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {

  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  }, 2000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 6000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg"; //a[class='btn-mktg btn-large-mktg btn-muted-mktg']
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  }, 40000);
});


//Задача 2

describe("Sign in GitHub", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/signup");
  });

  test("Button 'Sign in'", async () => {

  const btnSingIN = ".signups-rebrand__header-text.Link.Link--underline.f5";
  await page.waitForSelector(btnSingIN, {
    visible: true,
  });

  const actual = await page.$eval(btnSingIN , link => link.textContent);

  await expect(actual).toContain("Sign in");
  });


  test("Switching to the form 'Sign in GitHub'", async () => {

  const btnSingIN = await page.$(".signups-rebrand__header-text.Link.Link--underline.f5");
  await btnSingIN.click();

  const title = "div[class='auth-form-header p-0'] h1";
  await page.waitForSelector(title, {
    visible: true,
  });

  const actual = await page.$eval(title , link => link.textContent);

  await expect(actual).toContain("Sign in to GitHub");
  }, 7000);  
});



test("Form 'Sign in GitHub'", async () => {
  await page.goto("https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2Fsignup");

  const forgotPassword = "#forgot-password";
  await page.waitForSelector(forgotPassword, {
    visible: true,
  });

  const actual = await page.$eval(forgotPassword, link => link.textContent);

  await expect(actual).toContain("Forgot password");
  }); 
