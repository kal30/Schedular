/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import PushNotification from 'react-native-push-notification';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ListOfNotifications from './component/ListOfNotifications';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('onNotification:', notification);
    notification.finish(true);
  },
  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: false,
});

const App: () => React$Node = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [notificationTimePicked, setNotificationTimePicked] = useState(
    new Date(),
  );

  function testCancel() {
    console.log(new Date() + 'invoking function testCancel');
    PushNotification.cancelAllLocalNotifications();
  }

  function testPush() {
    console.log(new Date() + 'invoking function testPush');
    console.log(notificationTimePicked + ' This is notification Time Picked');
    console.log('Hours ', notificationTimePicked.getHours());
    console.log('Min ', notificationTimePicked.getMinutes());
    const dateAssigned = scheduledDateTime(
      notificationTimePicked.getHours(),
      notificationTimePicked.getMinutes(),
    );
    console.log(dateAssigned);
    PushNotification.localNotificationSchedule({
      channelId: 'fooChannel', // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
      message: 'My Notification Message', // (required)
      userInfo: {
        hours: notificationTimePicked.getHours(),
        when: notificationTimePicked,
        category: 'Mood',
      },
      date: dateAssigned,
      repeatType: 'day',
    });
  }

  function testLocalAtOnce() {
    console.log('Entered local notificaiton');
    if (!PushNotification.channelExists('fooChannel')) {
      PushNotification.createChannel(
        {
          channelId: 'fooChannel', // (required)
          channelName: 'My channel', // (required)
          channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
          playSound: true, // (optional) default: true
          soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
          importance: 4, // (optional) default: 4. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
      );
    }
    PushNotification.getChannels(function (channel_ids) {
      console.log(channel_ids);
    });
    PushNotification.localNotification({
      channelId: 'fooChannel', // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
      message: 'My Notification Message', // (required)
      userInfo: {
        hours: notificationTimePicked.getHours(),
        when: notificationTimePicked,
        category: 'Mood',
      },
      // date: dateAssigned,
      // repeatType: 'day',
    });
  }
  function scheduledDateTime(hour, minute) {
    const now = new Date();
    const schTimeToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour,
      minute,
    );
    const thirtySeconds = 30 * 1000;
    const thirtySecondsFromNow = new Date(now.getTime() + 30 * 1000);
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const schTimeTomorrow = new Date(schTimeToday.getTime() + twentyFourHours);
    return schTimeToday > thirtySecondsFromNow ? schTimeToday : schTimeTomorrow;
  }

  // function listThings(things) {
  //   things.forEach((thing) => {
  //     console.log(thing.id);
  //     console.log(thing.date);
  //   });
  // }

  // function listAllScheduledNotifications() {
  //   PushNotification.getScheduledLocalNotifications(listThings);
  // }

  const showDatePicker = () => {
    console.log('This is clicked');
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log('A date has been picked: ', date);
    console.log('Hours is ', date.getHours());
    console.log('Minutes is ', date.getMinutes());
    hideDatePicker();
    setNotificationTimePicked(date);
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.containerInRowTwo}>
          <TouchableOpacity style={styles.button} onPress={testPush}>
            <Text style={styles.sectionTitle}>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Show Date Picker"
            style={styles.button}
            onPress={showDatePicker}>
            <Text style={styles.sectionTitle}>Show date picker</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            locale="en_GB"
            is24Hour={true}
            headerTextIOS="Pick a time"
            isDarkModeEnabled={false}
          />
        </View>

        <View style={styles.containerInRowTwo}>
          <TouchableOpacity style={styles.button} onPress={testLocalAtOnce}>
            <Text style={styles.sectionTitle}>Notify me at once</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={testCancel}>
            <Text style={styles.sectionTitle}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <ListOfNotifications />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 15,
    color: 'blue',
  },

  containerInRowTwo: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 15,
  },

  button: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    height: 50,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fff',
  },

  buttonLook: {
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fff',
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
});

export default App;
