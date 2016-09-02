import {Component, OnInit, ElementRef} from '@angular/core';
import {ChatMessage} from './chat-message/chat-message';
import {SearchPipe} from './../pipes/pipe';
declare var jQuery: any;
declare var Util: any;

@Component({
  selector: '[chat-sidebar]',
  directives: [
    ChatMessage
  ],
  pipes: [SearchPipe],

  template: require('./chat-sidebar.html')
})
export class ChatSidebar implements OnInit {
  todayConversations: Array<any>;
  lastWeekConversations: Array<any>;
  newMessage: string = '';
  activeConversation: any;
  chatMessageOpened: boolean = false;
  $el: any;

  constructor(el: ElementRef) {
    /* tslint:disable */
    this.todayConversations = [{
      name: 'Chris Gray',
      status: 'success',
      lastMessage: "Hey! What's up? So many times since we",
      image: 'assets/images/people/a2.jpg',
      messages: [{
        text: "Hey! What's up?"
      }, {
        text: "Are you there?"
      }, {
        text: "Let me know when you come back."
      }, {
        text: "I am here!",
        fromMe: true
      }]
    }, {
      name: 'Jamey Brownlow',
      status: 'gray-light',
      lastMessage: "Good news coming tonight. Seems they agreed to proceed",
      image: 'assets/images/avatar.png'
    }, {
      name: 'Livia Walsh',
      status: 'danger',
      lastMessage: "Check out my latest email plz!",
      image: 'assets/images/people/a1.jpg'
    }, {
      name: 'Jaron Fitzroy',
      status: 'gray-light',
      lastMessage: "What about summer break?",
      image: 'assets/images/avatar.png'
    }, {
      name: 'Mike Lewis',
      status: 'success',
      lastMessage: "Just ain't sure about the weekend now. 90% I'll make it.",
      image: 'assets/images/people/a4.jpg'
    }];

    this.lastWeekConversations = [{
      name: 'Freda Edison',
      status: 'gray-light',
      lastMessage: "Hey what's up? Me and Monica going for a lunch somewhere. Wanna join?",
      image: 'assets/images/people/a6.jpg'
    }, {
      name: 'Livia Walsh',
      status: 'success',
      lastMessage: "Check out my latest email plz!",
      image: 'assets/images/people/a5.jpg'
    }, {
      name: 'Jaron Fitzroy',
      status: 'warning',
      lastMessage: "What about summer break?",
      image: 'assets/images/people/a3.jpg'
    }, {
      name: 'Mike Lewis',
      status: 'gray-light',
      lastMessage: "Just ain't sure about the weekend now. 90% I'll make it.",
      image: 'assets/images/avatar.png'
    }];
    /* tslint:enable */

    this.$el = jQuery(el.nativeElement);
    this.activeConversation = this.todayConversations[0];
  }

  openConversation(conversation): void {
    this.activeConversation = conversation;
    this.chatMessageOpened = true;
  }

  deactivateLink(e): void {
    jQuery(e.currentTarget).removeClass('active').find('.label').remove();
  }

  initChatSidebarScroll(): void {
    let $sidebarContent = jQuery('.chat-sidebar-contacts', this.$el);
    if (this.$el.find('.slimScrollDiv').length !== 0) {
      $sidebarContent.slimscroll({
        destroy: true
      });
    }
    $sidebarContent.slimscroll({
      height: window.innerHeight,
      width: '',
      size: '4px'
    });
  }

  ngOnInit(): void {
    let $chatContainer = jQuery('app').addClass('chat-sidebar-container');
    jQuery(document).on('swipeLeft', '.content-wrap', () => {
        if ($chatContainer.is('.nav-collapsed')) {
          $chatContainer.addClass('chat-sidebar-opened');
        }
      })
      /*
       * Hide chat on swipe right but first check if navigation is collapsed
       * otherwise do nothing
       */
      .on('swipeRight', () => {
        if ($chatContainer.is('.nav-collapsed.chat-sidebar-opened')) {
          $chatContainer.removeClass('chat-sidebar-opened')
            // as there is no way to cancel swipeLeft handlers attached to
            // .content making this hack with temporary class which will be
            // used by snNavigation directive to check whether it is permitted to open navigation
            // on swipeRight
            .addClass('nav-busy').one(Util.TRANSITION_END, () => {
            jQuery('app').removeClass('nav-busy');
          }).emulateTransitionEnd(300);
        }
      });

    jQuery(window).on('sn:resize', this.initChatSidebarScroll.bind(this));
    this.initChatSidebarScroll();
  }

}
