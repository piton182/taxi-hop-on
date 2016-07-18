import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Rides } from '../both/rides.js'

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  this.state = new ReactiveDict()
  this.state.setDefault({
    // selectedRide: {...},
  });
});

Template.hello.helpers({
  rides() {
    return Rides.find({});
  },
  selectedRide() {
    const instance = Template.instance();
    const selectedRideFromState = instance.state.get('selectedRide');
    return (selectedRideFromState) ? Rides.findOne({_id: selectedRideFromState._id}) : null;
  },
  selectedRideClass(rideId) {
    const instance = Template.instance();
    const selectedRideFromState = instance.state.get('selectedRide')
    if (selectedRideFromState) {
      if (typeof selectedRideFromState._id === 'string') {
        return (selectedRideFromState && selectedRideFromState._id === rideId) ? "background-color: yellow" : "";
      } else {
        // ObjectID
        return (selectedRideFromState && selectedRideFromState._id.equals(rideId)) ? "background-color: yellow" : "";
      }
    } else {
      return "";
    }
  },
});

Template.hello.events({
  'click .js-ride-join'(event, instance) {
    if (Meteor.user()) {
      const username = Meteor.user().emails[0].address;
      // TODO: here update happens without checking with back-end (the ride might've been deleted/become not available to join)
      Rides.update(
        {_id: instance.state.get('selectedRide')._id },
        { $set: { coriders: username } }
      );
    }
  },
  'click .ride-item'(event, instance) {
    instance.state.set('selectedRide', this);
  }
});
