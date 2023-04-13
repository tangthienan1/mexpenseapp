/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import awsConfig from './src/aws-exports';
import { Amplify } from 'aws-amplify';

Amplify.configure({ ...awsConfig, Analytics: { disabled: true } });

AppRegistry.registerComponent(appName, () => App);
