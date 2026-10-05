/** Minimal state container with React's `setState` semantics, driven from outside React. */
export class Store<Props, State> {
  props: Props;
  /** Subclasses assign the initial state in their constructor. */
  state = {} as State;
  /** Set by the hook that owns this store; called after every state change. */
  _force?: () => void;

  constructor(props: Props) {
    this.props = props || ({} as Props);
  }

  setState(partialState: Partial<State> | ((state: State) => Partial<State>)) {
    const nextState = typeof partialState == "function" ? partialState(this.state) : partialState;
    this.state = { ...this.state, ...nextState };
    if (this._force) {
      this._force();
    }
  }
}
