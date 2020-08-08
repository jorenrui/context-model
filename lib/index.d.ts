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
import React from 'react';
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
export default function createStore<State, Props = {}>(model: (props: Props) => State, config?: IConfig): {
    Provider: React.FC<Props>;
    useStore: () => State;
    useSelector: <T>(selector: ISelector<State, T>) => T;
};
