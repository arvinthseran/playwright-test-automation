import { test } from '../fixtures/basefixture';

test('Holiday entitlement App should be available', { tag:['@smoketest']}, async ({ startPage: startPage }) => {

  await test.step('Then the holiday entitlement calculator app should be available',  async () => {
    let startpage = await startPage.navigate();
    await startpage.verifyPage(); 
  });
});