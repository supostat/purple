import { Factory } from 'rosie';
import faker from 'faker';
import { mapCount, randomInteger } from '../utils';

Factory.define('clock-in-note')
  .sequence('id')
  .attr('note', () => faker.lorem.words(10))
  .attr('staffMemberId', ['staffMemberId'], function(staffMembers) {
    return randomInteger(staffMembers[0].id, staffMembers[staffMembers.length - 1].id);
  })
  .attr('addedByStaffMemberId', ['addedByStaffMemberId'], function(staffMembers) {
    return randomInteger(staffMembers[0].id, staffMembers[staffMembers.length - 1].id);
  })
  .attr('createdAt', ['createdAt'], function(date) {
    return date.toISOString();
  });

export default (count = 10, params = {}) => mapCount(count, () => Factory.build('clock-in-note', params));
