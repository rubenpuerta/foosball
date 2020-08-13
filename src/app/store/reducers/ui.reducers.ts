import { createReducer, on } from '@ngrx/store';
import { HeaderOptions } from '../../interfaces/ui.interfaces';
import { headerVisible } from '../actions/ui.actions';

export interface UIState {
  headerOptions: HeaderOptions;
}

const initialUIState: UIState = {
  headerOptions: {
    shouldBeVisible: false
  }
};

export const commonUIReducer = createReducer(
  initialUIState,
  on(headerVisible, (state, { headerOptions }) => ({
    ...state,
    headerOptions
  }))
);
