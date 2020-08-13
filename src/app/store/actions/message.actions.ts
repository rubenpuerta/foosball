import { createAction, props } from '@ngrx/store';
import { Message } from 'src/app/interfaces/message.interface';

// MESSAGE - ACTIONS
export const sendMessageNextMatchReady = createAction(
  '[sendMessageNextMatchReady] Send notification to next players, when match is ready to play',
  props<{ message: Message }>()
);
