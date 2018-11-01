import { Factory } from 'rosie';
import faker from 'faker';
import { mapCount } from '../utils';

Factory.define('staff-type')
  .sequence('id')
  .attrs({
    name: () => faker.name.jobType(),
    color: () => faker.internet.color(),
  });

export default (count = 10, params = {}) => mapCount(count, () => Factory.build('staff-type', params));
