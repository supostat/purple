import { Factory } from 'rosie';
import faker from 'faker';
import { mapCount, randomInteger } from '../utils';

Factory.define('staff-member')
  .sequence('id')
  .attrs({
    firstName: () => faker.name.firstName(),
    surname: () => faker.name.lastName(),
    avatarUrl: () => faker.internet.avatar(),
  })
  .attr('venueId', ['venueId'], venues => randomInteger(venues[0].id, venues[venues.length - 1].id))
  .attr('staffTypeId', ['staffTypeId'], staffTypes =>
    randomInteger(staffTypes[0].id, staffTypes[staffTypes.length - 1].id),
  )
  .attr('currentClockInState', ['currentClockInState'], statuses => statuses[randomInteger(0, statuses.length - 1)]);

export default (count = 10, params = {}) => mapCount(count, () => Factory.build('staff-member', params));
