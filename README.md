# React Native Calculator
*Teacher: Carl Shan*
*Credit for Tutorial: Kyle Banks*

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

NOTE: The characters "//" (slash-slash) is how you add a comment in JavaScript.

I will add the "//" followed by the name of the file (such as `App.js`) the code section belongs to. Take a look at the example below:

```javascript
// App.js

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
// App.js

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
//App.js

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
// Style.js
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
// App.js

render() {
    return (
        <View style={Style.rootContainer}>
            <View style={Style.displayContainer}></View>
            <View style={Style.inputContainer}></View>
        </View>
    )
}
```

### Adding the Input Buttons
Alright so our base layout is setup and our styles are externalized, so it’s time to add some buttons. We’re going to start by creating an `InputButton.js` file in the `calculatorapp` that will be used for displaying each button on the calculator.

Create the file `InputButton.js` and add the following code to it:

```javascript
//InputButton.js

import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import Style from './Style';

export default class InputButton extends Component {
    
    render() {
        return (
            <View style={Style.inputButton}>
                <Text style={Style.inputButtonText}>{this.props.value}</Text>
            </View>
        )
    }
    
}
```

Two things to note here:

1. We export the class directly using export default on the class definition.
2. The Text view uses `this.props.value`. Props are essentially static data that we can pass to child components, as we’ll see when we return to the ReactCalculator class shortly.

Let’s add some styles to `Style.js` for our InputButton component:

```javascript
//Style.js

var Style = StyleSheet.create({
    ... // <- Note that when I type '...' it just means I didn't want to type everything that should go here.
    
    inputButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#91AA9D'
    },

    inputButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white'
    }
});
```

With our reusable button defined, we can go back to the ReactCalculator and add our buttons.

Rather than defining the button one-by-one in the render function, let’s try to do this a little more programatically.

First we will define an array that represents the rows and inputs that will be displayed in the calculator. Next, we’ll create a function to dynamically generate the buttons, and call this from within render. This new function,  `_renderInputButtons`, will iterate each row in the inputButtons array, and for each input in the row, create an InputButton and add it to the row.

Let’s take a look at what we are adding to `App.js`:
```javascript
//App.js
import React, { Component } from 'react';
import {
    Text,
    StyleSheet
} from 'react-native';
import Style from './Style';
import InputButton from './InputButton';

// Define the input buttons that will be displayed in the calculator.
const inputButtons = [
    [1, 2, 3, '/'],
    [4, 5, 6, '*'],
    [7, 8, 9, '-'],
    [0, '.', '=', '+']
];

class ReactCalculator extends Component {

    render() {
        return (
            <View style={Style.rootContainer}>
                <View style={Style.displayContainer}></View>
                <View style={Style.inputContainer}>
                    {this._renderInputButtons()}
                </View>
            </View>
        )
    }

    /**
     * For each row in `inputButtons`, create a row View and add create an InputButton for each input in the row.
     */
    _renderInputButtons() {
        let views = [];

        for (var r = 0; r < inputButtons.length; r ++) {
            let row = inputButtons[r];

            let inputRow = [];
            for (var i = 0; i < row.length; i ++) {
                let input = row[i];

                inputRow.push(
                    <InputButton value={input} key={r + "-" + i} />
                );
            }

            views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
        }

        return views;
    }
}
```
*Note: The key on the Components within `_renderInputButtons` is required when you are creating an array of Components, and must be unique to each Component in the array.*

This demonstrates how to dynamically create Views, and how to call functions from within your render function. This allows us to create incredibly complex and state dependent interfaces!

If you look closely, you’ll also know we need a new inputRow style in `Style.js`.

Edit `Style.js` to now include the following in the Style variable:

```javascript
// Style.js
...
    inputRow: {
        flex: 1,
        flexDirection: 'row'
    }
...
```

Alright, give the application a run and you’ll see the calculator laid out like so:

![Calculator UI Finished](https://kylewbanks.com/images/post/react-native-tutorial-4.png)

At this point we have our calculator laid out and styled, but we still need to develop the actual functionality. In the next part of this tutorial, we’ll continue by adding touch event handling, implementing [State](https://facebook.github.io/react-native/docs/state.html) for UI updates, and perform the core arithmetic logic based on user input!


## Writing the Logic of the Calculator

### Handling Touch Events
The first thing we need to do before we proceed is to [handle touch events](https://facebook.github.io/react-native/docs/handling-touches.html) on the InputButtons.

First up, we’ll update the InputButton to use a Touchable view instead of the View it currently uses:

```javascript
// InputButton.js
...

    render() {
        return (
            <TouchableHighlight style={Style.inputButton}
                                underlayColor="#193441"
                                onPress={this.props.onPress}>
                <Text style={Style.inputButtonText}>{this.props.value}</Text>
            </TouchableHighlight>
        )
    }
    
...
```

Don’t forget to import `<TouchableHighlight>` from ```javascript 'react-native'``` at the top of the `App.js` file for this to work! 

You should also notice that we pass on the `onPress` prop to the `<TouchableHighlight>` component, so we’ll need to provide that from our presenting Component:

```javascript
// App.js
...

    _renderInputButtons() {
        ...
        inputRow.push(
            <InputButton
                value={input}
                onPress={this._onInputButtonPressed.bind(this, input)}
                key={r + "-" + i}/>
        );
    }
    
    _onInputButtonPressed(input) {
        alert(input)
    }
    
...
```

In the `_renderInputButtons` function we set the `onPress` prop with a reference to a new function called `_onInputButtonPressed`. We also bind the function with a reference to the input value, which will allow us to know what action to take based on which InputButton was clicked.

For now, all we’re doing is calling alert to show a dialog with the input value that was provided. If you’ve been following along closely, you should be able to run and click one of the InputButtons to get something like this (if you are running Android):

![Calculator Alert](https://kylewbanks.com/images/post/react-native-tutorial-5.png)

Now that we can handle touch events, and we know which button is being touched, we can start to develop the actual calculator functionality.

### Using State
State allows us to update the UI of our applications based on dynamic data. The first thing we’ll use State for is to update the display based on the numbers entered by the user.

First, let’s add a constructor to our ReactCalculator class to initialize the input number to zero:

```javascript
// App.js
...
class ReactCalculator extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            inputValue: 0
        }
    }
 ```
 The constructor takes a single props argument and passes it up the the super constructor. What we’re more interested in however is where we set state equal to `{ inputValue: 0 }`. During the constructor is the only time you can modify state directly, after which it must be deemed immutable and can only be modified using setState, as we’ll see in a moment.

Okay, so we have this `inputValue`, but how does it help us? We’ll, we’re going to use it in the display portion of the calculator that we created earlier in the tutorial. We’ll modify `render()` to add a `<Text>` component to the displayContainer that displays the value of inputValue:

```javascript
// App.js
...

    render() {
        return (
            <View style={Style.rootContainer}>
                <View style={Style.displayContainer}>
                    <Text style={Style.displayText}>{this.state.inputValue}</Text>
                </View>
                <View style={Style.inputContainer}>
                    {this._renderInputButtons()}
                </View>
            </View>
        )
    }

...
```

For good measure, here’s the new displayText style and updated displayContainer style as well:

```javascript
// Style.js
...
    displayContainer: {
        flex: 2,
        backgroundColor: '#193441',
        justifyContent: 'center'
    },

    displayText: {
        color: 'white',
        fontSize: 38,
        fontWeight: 'bold',
        textAlign: 'right',
        padding: 20
    },
...
```
Running the app, you should see that zero is displayed in Text view. That’s because we set the value to `this.state.inputValue`, which we initialized to zero during the constructor. So how do we actually update the value as the user enters numbers?

Back in our `_onInputButtonPressed` function, we’ll check the type of input. If the type is a Number, we’ll set the inputValue on the state equal to `(inputValue * 10) + input`. That way, each time the user enters a number, it will be added to the end of the existing inputValue, with each digit shifted once to the left. For example, typing `1` will result in `(0 * 10) + 1 = 1` because the initial inputValue is zero. Typing a subsequent `2` will result in `(1 * 10) + 2 = 12`, because the new inputValue was set to `1`.

Take a look:
```javascript
// App.js
...

    _onInputButtonPressed(input) {
        switch (typeof input) {
            case 'number':
                return this._handleNumberInput(input)
        }
    }

    _handleNumberInput(num) {
        let inputValue = (this.state.inputValue * 10) + num;

        this.setState({
            inputValue: inputValue
        })
    }
...
```
Run the app again, and you should be able to enter numbers and have them appear in the display! So how does this work? Any time you call the`this.setState()` function, React determines which components need to be reloaded to reflect the updated state. In this case, our displayText `<Text>` view is updated based on the value of `state.inputValue`, so by calling `this.setState()` with a new inputValue, the `<Text>` view is automatically reloaded.

### The Final Stretch
At this point, our application is almost there. The last thing we need to do is handle the arithmetic operations.

We’ll start by storing the type of operation and clearing the display whenever an arithmetic symbol is selected, and highlighting the selected symbol:

```javascript
//App.js
...

    constructor(props) {
        super(props);

        this.state = {
            previousInputValue: 0,
            inputValue: 0,
            selectedSymbol: null
        }
    }
    
    _renderInputButtons() {
        ...
        inputRow.push(
            <InputButton
                value={input}
                highlight={this.state.selectedSymbol === input}
                onPress={this._onInputButtonPressed.bind(this, input)}
                key={r + "-" + i}/>
        );
        ...
    }
    
    _onInputButtonPressed(input) {
        switch (typeof input) {
            case 'number':
                return this._handleNumberInput(input)
            case 'string':
                return this._handleStringInput(input)
        }
    }

    ...

    _handleStringInput(str) {
        switch (str) {
            case '/':
            case '*':
            case '+':
            case '-':
                this.setState({
                    selectedSymbol: str,
                    previousInputValue: this.state.inputValue,
                    inputValue: 0
                });
                break;
        }
    }
...
```
Alright, so what’s going on here? In the constructor we’ve added two more properties to the state: `previousInputValue` and `selectedSymbol`.

In the InputButton initialization, we now pass a new highlight property: a boolean (`true` or `false`) value set to `true` when the selectedSymbol value matches the value of the InputButton. This will display a highlight, for example, on the multiplication button when you select the multiplication symbol.

In the touch event handler, we also handle string input types now, by calling `_handleStringInput()`. The `_handleStringInput()` function is responsible for updating the `selectedSymbol`, clearing the `inputValue`, and assigning it to the `previousInputValue` which we aren’t using yet.

In the `<InputButton>` class, we need to support the new highlight prop:
```javascript
// InputButton.js
...
    render() {
        return (
            <TouchableHighlight style={[Style.inputButton, this.props.highlight ? Style.inputButtonHighlighted : null]}
            ...
```

This demonstrates something we haven’t done yet, using multiple styles. This works essentially the same as CSS, with the properties of each style cascading. This is very powerful, and allows us to overwrite properties from previous styles, and to apply conditional styles like in the case above.

The inputButtonHighlighted style will only be applied when the highlight prop is set to true, and looks like so:

```javascript
// Style.js
...
    inputButtonHighlighted: {
        backgroundColor: '#193441'
    },
...
```

The final thing we need to do is handle the `=` operator. We’ll update `_handleStringInput` for this:

```javascript
// App.js
...
    _handleStringInput(str) {
        switch (str) {
           ...
            
            case '=':
                let symbol = this.state.selectedSymbol,
                    inputValue = this.state.inputValue,
                    previousInputValue = this.state.previousInputValue;

                if (!symbol) {
                    return;
                }

                this.setState({
                    previousInputValue: 0,
                    inputValue: eval(previousInputValue + symbol + inputValue),
                    selectedSymbol: null
                });
                break;
        }
    }
...
```

Here we ensure a `selectedSymbol` is set. Assuming it is, we clear the `previousInputValue` and `selectedSymbol` values, and set the inputValue equal to the result of the selected mathematical operation. This updates the UI with the result of the equation, clears the highlighted `InputButton`, and allows the user to continue performing calculations on the results.

Here’s a look at what `24 / 3` looks like:

![24 / 3](https://kylewbanks.com/images/post/react-native-tutorial-6.png)
Now we know!

### Where To Go From Here
Even though the tutorial has come to an end, there are a couple of intentionally unhandled components that you can try to solve on your own from here:

1. The decimal (.) operator remains unimplemented. How can you take what you’ve learned to implement this?
2. Try dividing by zero.
3. There’s no way to clear (C) the current input or clear everything (CE) in order to restart your calculations with a clean slate.

Feel free to take a stab at these features!