import { Meteor } from 'meteor/meteor';

import { Rides } from '../both/rides.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('rides', function ridesPublication() {
  return Rides.find();
});
