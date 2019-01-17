import { Factory } from 'rosie';
import faker from 'faker';
import { mapCount, randomInteger } from '../utils';

Factory.define('inviter')
  .sequence('id')
  .attrs({
    firstName: () => faker.name.firstName(),
    surname: () => faker.name.lastName(),
    email: () => faker.internet.email(),
    role: 'admin',
    venues: 'a, b, c',
    status: 'pending',
    inviterName: faker.name.findName(),
    invitedAt: faker.date.past(),
  });

export default (count = 10, params = {}) => mapCount(count, () => Factory.build('inviter', params));
