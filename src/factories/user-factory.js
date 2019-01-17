import { Factory } from 'rosie';
import faker from 'faker';
import { mapCount, randomInteger } from '../utils';

Factory.define('user')
  .sequence('id')
  .attrs({
    firstName: () => faker.name.firstName(),
    surname: () => faker.name.lastName(),
    role: 'admin',
  });

export default (count = 10, params = {}) => mapCount(count, () => Factory.build('user', params));
