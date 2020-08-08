export interface IConfig {
    displayName: string;
}
export declare type ISelector<State, R> = (state: State) => R;
