Feature('login');

Scenario('Unregistered user', (I) => {
  I.amOnPage('http://localhost:4200');
  I.see('Login');
  I.seeElement({ css: 'input[formcontrolname="email"]' });
  I.fillField({ css: 'input[formcontrolname="email"]' }, 'test@puppeteer.io');
  I.click('//button[contains(., "Login")]');
  I.see('Sign-up');
});

Scenario('Registered user', (I) => {
  I.amOnPage('http://localhost:4200');
  I.see('Login');
  I.seeElement({ css: 'input[formcontrolname="email"]' });
  I.fillField(
    { css: 'input[formcontrolname="email"]' },
    'user@foosball-test.com'
  );
  I.click('//button[contains(., "Login")]');
  I.see('Book a match');
});
