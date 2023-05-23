/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Amplify} from 'aws-amplify';
import awsExports from './src/aws-exports';
import {DataStore} from 'aws-amplify';
import {SQLiteAdapter} from '@aws-amplify/datastore-storage-adapter/SQLiteAdapter';
import 'core-js/full/symbol/async-iterator';
// import AsyncStorage from '@react-native-async-storage/async-storage';
DataStore.configure({
  storageAdapter: SQLiteAdapter,
});
Amplify.configure(awsExports);

AppRegistry.registerComponent(appName, () => App);
