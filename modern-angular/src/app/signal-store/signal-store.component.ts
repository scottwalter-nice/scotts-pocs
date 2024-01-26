import { Component, signal } from '@angular/core';
import { reduce } from 'rxjs';

type Reducer<TState, TAction> = (state: TState, action: TAction) => TState;

const signalReducer = <TState, TAction>(initial: TState, reducer: Reducer<TState, TAction>) => {
  const stateSignal = signal(initial);
  return {
    value: stateSignal.asReadonly(),
    dispatch: (action: TAction) => {
      stateSignal.update(currentValue => reducer(currentValue, action));
    }
  };
};

type BalanceAction =
  | { type: 'DEPOSIT'; amount: number }
  | { type: 'WITHDRAW'; amount: number };

@Component({
  selector: 'app-signal-store',
  standalone: true,
  imports: [],
  template: `
    <h1>Balance: {{ account.value().balance }}</h1>
    <button (click)="account.dispatch({ type: 'DEPOSIT', amount: 10 })">Deposit</button>
    <button (click)="account.dispatch({ type: 'WITHDRAW', amount: 10 })">Withdraw</button>
  `,
  styleUrl: './signal-store.component.scss'
})
export class SignalStoreComponent {
  account = signalReducer({ balance: 100 }, (state, action: BalanceAction) => {
    switch (action. type) {
      case 'DEPOSIT':
        return {...state, ...state, balance: state.balance + action.amount };
      case 'WITHDRAW' :
        return { ...state, balance: state. balance - action.amount };
      default:
      return state;
    }
  });;
}
