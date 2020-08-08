# Context Model

> A personal context API wrapper for state management driven by the desire to learn more and experiment.

![NPM Version](https://img.shields.io/badge/npm-v1.0.0-orange)
![License Status](https://img.shields.io/badge/license-MIT-blue)

A simple wrapper for the Context API.

## Installation

Install it using [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/):

```bash
# Using NPM
npx context-model
# or
npm install --save context-model

# Using Yarn
yarn context-model
```

## Usage

### Creating a Store

#### JavaScript

First define the **Context Model**:

```javascript
// ANCHOR React
import React from 'react';

// ANCHOR Model
import createStore from 'context-model';

/**
 * ANCHOR Counter
 * Creating a Counter context model using `createStore`.
 * `contextModel` will return an object with `Provider` and `useStore` methods.
 */
const Counter = createStore(({ initialCount }) => {
    const [count, setCount] = React.useState(initialCount ?? 0);

    const increment = () => {
      setCount((count) => count + 1);
    }

    const decrement = () => {
      setCount((count) => count - 1);
    }

    const reset = () => {
      setCount(0);
    }

    return {
      count,
      increment,
      decrement,
      reset,
    }
  },
);

export default Counter;
```

#### TypeScript

First define the **Context Model**:

```typescript
// ANCHOR React
import React from 'react';

// ANCHOR Model
import createStore from 'context-model';

/**
 * ANCHOR IProps
 * This will be the basis for the type of
 * the context model's provider component
 * 
 * The following example makes the initialCount
 * prop optional
 */
interface IProps {
  initialCount?: number;
}

/**
 * ANCHOR IState
 * This will be the basis for the type of
 * the return value of the function given to
 * `createStore`.
 */
interface IState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

/**
 * ANCHOR Counter
 * Creating a Counter context model using `createStore`.
 * `contextModel` will return an object with `Provider` and `useStore` methods.
 */
const Counter = createStore<IState, IProps>(({ initialCount }) => {
    const [count, setCount] = React.useState(initialCount ?? 0);

    const increment = () => {
      setCount((count) => count + 1);
    }

    const decrement = () => {
      setCount((count) => count - 1);
    }

    const reset = () => {
      setCount(0);
    }

    // Based on type IState
    return {
      count,
      increment,
      decrement,
      reset,
    }
  },
);

export default Counter;
```

### Adding the Provider

To allow the consumption of the context, add the `Provider` to the component tree.

```javascript
function App() {
  return (
    <Counter.Provider>
      <Count />
      <Controls />
    </Counter.Provider>
  );
}
```

### useStore hook

To **consume** the context, you may use the `useStore` hook. This returns the state object.

```javascript
function Count() {
  const { count } = Counter.useStore();

  return <h1>{count}</h1>
}

function Controls() {
  const { increment, decrement, reset } = Counter.useStore();

  return (
    <>    
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <button onClick={reset}>reset</button>
    </>
  );
}
```

`useStore` can be use in the following ways:

```javascript
// Getting the state object
const store = Counter.useStore();

// Deconstructing the state object
const { count, reset } = Counter.useStore();
```

### useSelector hook

To **consume** and **transform** the context, you may use the `useSelector` hook. This takes in a selector function as its props then returns a value based on the given function.

```javascript
// Providing a callback function that transforms the store value
const count = Counter.useSelector((state) => state.count + 10);
const [incrementedCount, decrementedCount] = Counter.useSelector((state) => [
  state.count + 1,
  state.count - 1,
]);

// Or you can do it like this 👀
function addTen(number) {
  return number + 10;
}

const count = Counter.useSelector((state) => addTen(state.number));

// This callback function is also useful for picking specific value(s) from the store like so:
const count = Counter.useSelector((state) => state.count);
```

### Options

For better experience in debugging using the Dev Tools, you may add the `displayName` of the context model. In this case I named the model as `Counter`:

```javascript
const Counter = createStore((state) => state, {
  displayName: 'Counter',
});

```

## Inspirations

### [React Scoped Model](https://github.com/LXSMNSYC/react-scoped-model)

Being new to React, I wanted to learn more about state management. Thus I decided to try my hand on it by creating a simple wrapper for the Context API. The react-scoped-model inspired the structure of this wrapper, namely the usage of `useSelector` and `Provider`.

### [Awesome React Context](https://github.com/diegohaz/awesome-react-context)

A list of all things Context API. You might want to check it out if you're also curious to learn more 👀.

## Changelog

[Changelog](https://github.com/jorenrui/context-model/blob/master/CHANGELOG.md)

## License

MIT © [Joeylene Rivera](https://github.com/jorenrui)
