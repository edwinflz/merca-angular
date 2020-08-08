import { Component, OnInit } from '@angular/core';
import { ConversationService } from '@core/services/conversation/conversation.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  textMessage: string;
  businessId: any;
  user;
  business;
  conversationId: string;
  conversations: any[];

  shake = false;


  constructor(
    private conversationService: ConversationService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getParamsUrl();
  }

  sendMessage() {

    const message = {
      uid: this.conversationId,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.business.uid,
      type: 'text'
    };

    this.conversationService.createConversation(message)
      .then(() => {
        this.textMessage = '';
      });
  }


  getParamsUrl() {
    this.activatedRoute.params.subscribe((arg) => {
      this.businessId = arg.id;
      this.getStatusUser();
    });
  }

  getStatusUser() {
    this.authService.getStatus().subscribe((status) => {
      this.getUserById(status.uid);
    }, (error) => {
      console.log(error);
    });
  }

  getUserById(uid: string) {
    this.authService.getUserById(uid)
      .valueChanges()
      .subscribe((data) => {
        this.user = data;
        this.createIdConversation(this.businessId);
      }, (error) => {
        console.log(error);
      });
  }

  createIdConversation(uid: string) {
    this.authService.getUserById(uid)
      .valueChanges()
      .subscribe((data) => {
        this.business = data;
        const ids = [this.user.uid, this.business.uid].sort();
        this.conversationId = ids.join('|');
        this.getConversation();
      }, (error) => {
        console.log(error);
      });
  }

  getConversation() {
    this.conversationService.getConversations(this.conversationId)
      .valueChanges()
      .subscribe((data) => {
        console.log(data);
        this.conversations = data;
        this.eachMessageSeen(this.conversations);
      }, (error) => {
        console.log(error);
      });
  }

  eachMessageSeen(conversations) {
    conversations.forEach((message) => {
      if (!message.seen) {
        message.seen = true;
        this.conversationService.editConversation(message);
        if (message.type === 'text') {
          const audio = new Audio('assets/sound/new_message.m4a');
          audio.play();
        }
      }
    });

  }

  getUserNickById(id) {
    if (id === this.business.uid) {
      return this.business.nick;
    } else {
      return this.user.nick;
    }
  }


}
