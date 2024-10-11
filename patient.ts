import { faker } from '@faker-js/faker';
import * as fs from 'fs';

interface User {
  _id: string;
  avatar: string;
  birthday: Date;
  email: string;
  firstName: string;
  lastName: string;
  sex: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}


function createRandomUser(): User {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const address = faker.location.streetAddress({ useFullAddress: true });
  const zipCode = faker.location.zipCode();
  const city = faker.location.city();
  const state = faker.location.state();

  return {
    _id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
    email,
    firstName,
    lastName,
    sex,
    address,
    city,
    state,
    zipCode,
  };
}

function createAndSaveUsers(count: number): void {
  const users: User[] = Array.from({ length: count }, createRandomUser);
  const jsonContent = JSON.stringify(users, null, 2);
  
  fs.writeFile('users.json', jsonContent, 'utf8', (err) => {
    if (err) {
      console.error('An error occurred while writing the JSON file:', err);
    } else {
      console.log(`${count} users have been saved to users.json`);
    }
  });
}

const createUsers = (numUsers = 5) => {
  createAndSaveUsers(numUsers);
  return Array.from({length: numUsers}, createRandomUser);
}

createUsers(5);

