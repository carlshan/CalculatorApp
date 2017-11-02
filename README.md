# React Native Calculator
Teacher: Carl Shan

This tutorial on how to create a calculator app follows Kyle Banks' [React Native Tutorial](https://kylewbanks.com/blog/react-native-tutorial-part-1-hello-react) and modifies it for Intro to Mobile App Development, an elective taught to 7th and 8th grade students at the Nueva Middle School in Fall 2017.

## Instructions

### Creating the starter folder
1. First, you should open Terminal and run the command `cd Desktop`.
2. Then run `create-react-native-app calculatorapp`
	* This will create a folder called `calculatorapp` on your Desktop. Inside there should be a lot of starter files for you to modify and edit.
	* The key file is called `App.js`
3. If you run into any issues in doing this, ask those around you for help. 
4. If no one else can help you, find me and we will resolve it together.

### Editing App.js
1. Use Atom to open `App.js` and delete all the contents inside.
2. Copy the following code into it:

```javascript
import React, { Component } from 'react';
import {
    Text,
    StyleSheet
} from 'react-native';

class ReactCalculator extends Component {

    render() {
        return (
        <View style={styles.container}>
            <Text>Hello, React!</Text>
         </View>
        )
    }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


```
3. Run `npm start` in Terminal in the calculatorapp folder and verify that it works by using either the iOS emulator (press `i` when the Terminal tells you to do so to open the emulator) or by using the Expo app on your phone.
4. If there are any problems, ask those around you or ask me.