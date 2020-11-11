/**
 * @license
 *
 * MIT License
 *
 * Copyright (c) 2020 Joeylene Rivera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @author Joeylene Rivera
 */
// ANCHOR React
import React from 'react';

// ANCHOR Types
import { IConfig, ISelector } from './types';

/**
 * ANCHOR Context Model
 * Uses the Context API for state management.
 * Returns an object with `Provider` and `useStore` methods.
 *
 * @param model A function that contains the logic for state management
 * @param config An optional configuration object for the context,
 * includes a displayName of the model for debugging purposes
 */
export default function createStore<State, Props = {}>(
  model: (props: Props) => State,
  config?: IConfig,
) {
  const displayName = config?.displayName ?? 'AnonymousModel';

  /**
   * ANCHOR Context
   * A value that is available to all child components, namely the Consumers,
   * of a given component that holds and manages the context, namely
   * the Provider
   * - Initial state is `undefined`
   * - Display Name is given for debugging purposes
   */
  const Context = React.createContext<State | undefined>(undefined);
  Context.displayName = displayName;

  /**
   * ANCHOR Provider
   * Provides the context. It allows the consumption of the context by the
   * child components.
   * - Provider is used like a React component.
   *   Ex:
   *    <ModelName.Provider>
   *       <ChildComponent />
   *    </ModelName.Provider>
   * - The value of context is retrieved from the given model function
   * in `createStore`
   *
   * @param props The props of the provider component. Type is derived from
   * the given type `Props` in `createContext`
   */
  const Provider: React.FC<Props> = (props) => {
    const value = model(props);

    return (
      <Context.Provider value={value}>
        { props.children }
      </Context.Provider>
    );
  };

  /**
   * ANCHOR useStore
   * Acts as a Consumer. Used for consuming the context from the Provider.
   * Returns the state.
   */
  const useStore = () => {
    const state = React.useContext(Context);

    if (!state) {
      throw new Error(`The useStore must have a parent ${displayName} Provider`);
    }

    return state;
  };

  /**
   * ANCHOR useSelector
   * Acts as a Consumer. Used for consuming the context from the Provider.
   * Returns a value based on a given selector.
   * @param selector A callback function that transforms the state/value
   */
  function useSelector<T>(selector: ISelector<State, T>) {
    const state = React.useContext(Context);

    if (!state) {
      throw new Error(`The useStore must have a parent ${displayName} Provider`);
    }

    return selector(state);
  }

  return {
    Provider,
    useStore,
    useSelector,
  };
}
