import { Factory } from 'rosie';
import faker from 'faker';
import { mapCount } from '../utils';

Factory.define('venue')
  .sequence('id')
  .sequence('apiKey')
  .attrs({
    name: () => faker.company.companyName(),
  });

export default (count = 10, params = {}) => mapCount(count, () => Factory.build('venue', params));
