import { createAction, props } from '@ngrx/store';
import { HeaderOptions } from 'src/app/interfaces/ui.interfaces';

// UI - HEADER OPTIONS
export const headerVisible = createAction(
  '[headerVisible] Determine if header is visible',
  props<{ headerOptions: HeaderOptions }>()
);
