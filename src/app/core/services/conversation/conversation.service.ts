import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private afd: AngularFireDatabase) { }

  createConversation(conversation) {
    return this.afd.object(`conversations/${conversation.uid}/${conversation.timestamp}`)
      .set(conversation);
  }

  getConversations(uid) {
    return this.afd.list(`conversations/${uid}`);
  }

  editConversation(conversation) {
    return this.afd.object(`conversations/${conversation.uid}/${conversation.timestamp}`)
      .set(conversation);
  }
}
