import { Meteor } from 'meteor/meteor';

import { Rides } from '../both/rides.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('rides', function ridesPublication() {
  // TODO: if coriders is null (instead of empty string), this query woun't match it
  return Rides.find({$or: [{coriders: ''}, {coriders: null}]});
});

Meteor.publish('myRides', function myRidesPublication() {
  const currentUser = Meteor.users.findOne(this.userId);
  // TODO: if coriders is null (instead of empty string), this query woun't match it
  if (this.userId) {
    return Rides.find({
      coriders: currentUser.emails[0].address
    });
  } else {
    return null;
  }
  // return null;
});
