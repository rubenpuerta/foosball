import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule, ActionReducerMap } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';
import {
  GetPlayersEffects,
  SavePlayersEffects,
  DeletePlayersEffects,
  EditPlayerEffects
} from './store/effects/player.effects';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { UserContainerComponent } from './components/user-container/user-container.component';
import { reducers, metaReducers, State } from './store/reducers';
import { UserFormContainerComponent } from './components/user-form-container/user-form-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import { BookFormContainerComponent } from './components/book-form-container/book-form-container.component';
import {
  GetMatchesRequestEffects,
  SaveMatchRequestEffect,
  DeleteMatchRequestEffect
} from './store/effects/match-request.effects';
import { MatchesListContainerComponent } from './components/matches-list-container/matches-list-container.component';
import { MatchesListComponent } from './components/matches-list/matches-list.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DialogComponent } from './components/shared/dialog/dialog.component';
import { AsyncPipe } from '@angular/common';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { MessagingService } from './services/messaging.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { PasswordlessAuthComponent } from './components/passwordless-auth/passwordless-auth.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<State>>(
  'root reducer'
);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    UserFormComponent,
    BookFormComponent,
    HeaderComponent,
    UserContainerComponent,
    UserFormContainerComponent,
    BookFormContainerComponent,
    MatchesListContainerComponent,
    MatchesListComponent,
    DialogComponent,
    PasswordlessAuthComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireMessagingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forRoot(REDUCER_TOKEN, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([
      GetPlayersEffects,
      SavePlayersEffects,
      EditPlayerEffects,
      DeletePlayersEffects,
      GetMatchesRequestEffects,
      SaveMatchRequestEffect,
      DeleteMatchRequestEffect
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  entryComponents: [DialogComponent],
  providers: [
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'auto' } },
    {
      provide: REDUCER_TOKEN,
      useValue: reducers
    },
    MessagingService,
    AsyncPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
