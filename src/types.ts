export interface IConfig {
  displayName: string;
}

export type ISelector<State, R> = (state: State) => R;
