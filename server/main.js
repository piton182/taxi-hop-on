import { Meteor } from 'meteor/meteor';

import { Rides } from '../both/rides.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('rides', function ridesPublication() {
  // TODO: if coriders is null (instead of empty string), this query woun't match it
  return Rides.find({
    coriders: ''
  });
});
