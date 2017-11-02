# React Native Calculator
*Teacher: Carl Shan*

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
2. Copy the following code into the file:

```javascript
import React, { Component } from 'react';
import {
    Text,
    StyleSheet
} from 'react-native';

class ReactCalculator extends Component {

    render() {
        return (
        <View style={{flex: 1, alignItems: 'center', 'justifyContent': 'center'}}>
            <Text>Hello, React!</Text>
         </View>
        )
    }
}

```
3. Run `npm start` in Terminal in the calculatorapp folder and verify that it works by using either the iOS emulator (press `i` when the Terminal tells you to do so to open the emulator) or by using the Expo app on your phone.
4. If there are any problems, ask those around you or ask me.


### Laying Out The Calculator
(The source of the contente below is from Kyle's blog [here](https://kylewbanks.com/blog/react-native-tutorial-part-2-designing-a-calculator))

The first thing we’ll want to do is layout the calculator. The calculator is going to have two primary sections:

1. The “display” section, where we’ll see the input we enter and the result of our calculations.
2. The “input” section, where we’ll enter numbers and mathematical operations.

Let’s open up the `App.js` source file and create the two sections using flexbox. Go ahead and edit the `render()` function so that it instead looks like the following:

```javascript
render() {
    return (
        <View style={styles.container}>
            <View style={{flex: 2, backgroundColor: '#193441'}}></View>
            <View style={{flex: 8, backgroundColor: '#3E606F'}}></View>
        </View>
    )
}
```

What we’ve done here is create a container `<View>` that wraps the two sections I mentioned earlier, and takes up the full width and height available by styling it with `flex: 1`. Each Component can only have one root `<View>`, hence why the container is necessary.

Inside the container, we create two `<Views>` that take up 20 and 80 percent of the root container, by styling them with `flex: 2` and `flex: 8` respectively. In order to better see the two distinct components, we assign each a background color as well.

You’ll also need to import the `<View>` class from react-native, by adding it to the existing imports at the top of the `App.js` file like so:

```javascript
import {
    View,
    Text,
	StyleSheet
} from 'react-native';
```

If you run the application now using `npm start`, you should see the following:

![Calculator](https://kylewbanks.com/images/post/react-native-tutorial-3.png)

Alright so now we’re starting to look a little like a calculator, but before we continue, we should clean up those styles. The inline styling is great for quickly checking something out, but it can quickly grow into a big ugly mess if it gets out of hand. 

Luckily we aren’t restricted to defining the full styles inline like this, as we can create a StyleSheet that can then be referenced. This also allows us to reuse styles across several components, which we’ll need for our buttons shortly.

### Styling the Calculator
We're going to make a file called 'Style.js' in which we will include 

Create a new source file called `Style.js` in the `calculatorapp` folder, and copy the following code inside it:

```javascript
import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
    rootContainer: {
        flex: 1
    },

    displayContainer: {
        flex: 2,
        backgroundColor: '#193441'
    },

    inputContainer: {
        flex: 8,
        backgroundColor: '#3E606F'
    }
});

export default Style;
```

You’ll notice at the bottom we export the `Style` variable so that it can be used by other source files that import `Style.js`, which is exactly what we’re about to do.

Back in the `App.js` file, let’s update our `render()` function to reference the styles we defined in `Style.js`:

```javascript
import Style from './Style';
...
render () {
return (
<View style={Style.rootContainer}>
    <View style={Style.displayContainer}></View>
    <View style={Style.inputContainer}></View>
</View>
)
}
```