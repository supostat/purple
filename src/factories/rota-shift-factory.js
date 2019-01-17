import { Factory } from 'rosie';
import faker from 'faker';
import { mapCount, randomInteger } from '../utils';

let startDate;
let endDate;
Factory.define('clock-in-pariod')
  .sequence('id')
  .attr('staffMemberId', ['staffMemberId'], function(staffMembers) {
    return randomInteger(staffMembers[0].id, staffMembers[staffMembers.length - 1].id);
  })
  .attr('venueId', ['venueId'], function(venues) {
    return randomInteger(venues[0].id, venues[venues.length - 1].id);
  })
  .attr('date', ['date'], function(date) {
    return date;
  })
  .attr('startsAt', ['date'], function(date) {
    return faker.date.between(startDate, endDate);
  })
  .attr('endsAt', ['date'], function(date) {
    return faker.date.between(startDate, endDate);
  });

export default (count = 10, params = {}) => mapCount(count, () => Factory.build('clock-in-pariod', params));
