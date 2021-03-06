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
/**
 * ANCHOR Context Model
 * Uses the Context API for state management.
 * Returns an object with `Provider` and `useStore` methods.
 *
 * @param model A function that contains the logic for state management
 * @param config An optional configuration object for the context,
 * includes a displayName of the model for debugging purposes
 */
export default function createStore(model, config) {
    var _a;
    var displayName = (_a = config === null || config === void 0 ? void 0 : config.displayName) !== null && _a !== void 0 ? _a : 'AnonymousModel';
    /**
     * ANCHOR Context
     * A value that is available to all child components, namely the Consumers,
     * of a given component that holds and manages the context, namely
     * the Provider
     * - Initial state is `undefined`
     * - Display Name is given for debugging purposes
     */
    var Context = React.createContext(undefined);
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
    var Provider = function (props) {
        var value = model(props);
        return (React.createElement(Context.Provider, { value: value }, props.children));
    };
    /**
     * ANCHOR useStore
     * Acts as a Consumer. Used for consuming the context from the Provider.
     * Returns the state.
     */
    var useStore = function () {
        var state = React.useContext(Context);
        if (!state) {
            throw new Error("The useStore must have a parent " + displayName + " Provider");
        }
        return state;
    };
    /**
     * ANCHOR useSelector
     * Acts as a Consumer. Used for consuming the context from the Provider.
     * Returns a value based on a given selector.
     * @param selector A callback function that transforms the state/value
     */
    function useSelector(selector) {
        var state = React.useContext(Context);
        if (!state) {
            throw new Error("The useStore must have a parent " + displayName + " Provider");
        }
        return selector(state);
    }
    return {
        Provider: Provider,
        useStore: useStore,
        useSelector: useSelector,
    };
}
//# sourceMappingURL=index.js.map