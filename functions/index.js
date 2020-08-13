/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const serviceAccount = require('../.private/rnrtablefootbal.json');
const fInfo = require('../.private/f-info.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: fInfo.DB_URL,
});
const db = admin.firestore();

exports.sendMessage = functions
  .region('europe-west2')
  .firestore.document('matchesRequest/{matchId}')
  .onDelete((snap, context) => {
    db.collection('matchesRequest')
      .orderBy('createdAt', 'asc')
      .limit(1)
      .get()
      .then((match) => {
        if (match.size === 0) {
          return false;
        }
        let data = match.docs[0].data();
        getPlayersMessageId(data.players);
        return true;
      })
      .catch((err) => {
        // Error fetching documents
        console.log('matchesRequest error', err);
      });

    const getPlayersMessageId = (nextMatchPlayers) => {
      db.collection('players')
        .where('id', 'in', nextMatchPlayers)
        .get()
        .then((players) => {
          let messageIdList = players.docs.map((doc) => {
            let player = doc.data();
            return player.messageId;
          });
          // const messagePayLoad = {
          //   registration_ids: getPlayersMessageId(data.players),
          //   notification: {
          //     title: 'Fossball',
          //     body: 'Welcome to fossball reservation app',
          //     image: '../../assets/images/avatars/icon-32x32.png'
          //   }
          // };
          pushMessage(messageIdList);
          return true;
        })
        .catch((err) => {
          // Error fetching documents
          console.log('getPlayersMessageId error', err);
        });
    };

    const pushMessage = (tokens) => {
      const message = {
        notification: {
          title: 'Fossball - Calienta que sales',
          body: 'Fossball is free now and is your turn',
          image: `https://firebasestorage.googleapis.com/v0/b/rnrtablefootball.appspot.com/o/icon-32x32.png?alt=media&token=${fInfo.TOKEN}`,
        },
        tokens,
        data: {
          prueba: 'texto de prueba',
        },
      };
      console.log(message);
      admin
        .messaging()
        .sendMulticast(message)
        .then((response) => {
          // Response is a message ID string.
          console.log('Successfully sent message:', JSON.stringify(response));
          return;
        })
        .catch((error) => {
          console.log('Error sending message:', JSON.stringify(error));
        });
    };
    return true;
  });
