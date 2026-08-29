import { test, expect } from '@playwright/test';

test('get users from API endpoint', async ({ request }) => {

  const response = await request.get('https://reqres.in/api/users?page=2');
  const responseObject = await response.json()

  //Show the JSON of the whole response in the console for debugging purposes
  console.log(responseObject);

  
  //Test if response is valid
  expect(response.status()).toBe(200);

  //Test if we are on page 2 from the request
  expect(responseObject.page).toBe(2);

  //Test if the number of users returned is 6 and the first user has id 7 and email '
  expect(responseObject.data.length).toBe(6);
  expect(responseObject.data[0].id).toBe(7);

  //Test if e-mail is INCORRECT
  expect(responseObject.data[0].email).not.toBe('michael.holt@reqres.in');

  //Test if e-mail is CORRECT
  expect(responseObject.data[0].email).toBe('michael.lawson@reqres.in');

  //Fail test to test GITHUB reporter
  expect(responseObject.data[0].email).toBe('michael.holt@reqres.in');

});

test('post users from API endpoint', async ({ request }) => {

  const response = await request.post('https://reqres.in/api/users?page=2', {
 
     data: {
        name: 'Test Name',
      },
    }
  );
 
  const responseObject = await response.json()

  //Show the JSON of the whole response in the console for debugging purposes
  console.log(responseObject);

  //Test if response is valid
  expect(response.status()).toBe(201);

  //Test if the name is correct
  expect(responseObject.name).toBe('Test Name');

});
