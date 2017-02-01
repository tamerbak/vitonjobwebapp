import {Component, OnInit, ElementRef} from "@angular/core";
import {ChatMessage} from "../chat-sidebar/chat-message/chat-message";
import {SearchPipe} from "./../pipes/pipe";
import {SharedService} from "../../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";

declare let jQuery: any;
declare let Util: any;

@Component({
  selector: '[app-sidebar]',
  directives: [
    ChatMessage, ROUTER_DIRECTIVES
  ],
  pipes: [SearchPipe],

  template: require('./app-sidebar.html')
})
export class AppSidebar implements OnInit {
  applications: Array<any>;
  newMessage: string = '';
  activeConversation: any;
  chatMessageOpened: boolean = false;
  $el: any;

  constructor(el: ElementRef,private sharedService: SharedService, private router: Router) {
    /* tslint:disable */
    this.applications = [{
      name: 'Employeur',
      status: 'success',
      lastMessage: "Embauche 2.0!",
      image: 'assets/images/people/a2.jpg'
    }, {
      name: 'Jobyer',
      status: 'gray-light',
      lastMessage: "Emploi 2.0!",
      image: 'assets/images/avatar.png'
    }, {
      name: 'Hunter',
      status: 'danger',
      lastMessage: "Capturer une opportunité",
      image: 'assets/images/people/a1.jpg'
    }];

    /* tslint:enable */

    this.$el = jQuery(el.nativeElement);
    this.activeConversation = this.applications[1];
  }

  openConversation(app): void {
    this.activeConversation = app;
    this.sharedService.logOut();
    if (app.name === 'Employeur' ){
      this.sharedService.setProjectTarget('employer');
    } else if (app.name === 'Jobyer'){
      this.sharedService.setProjectTarget('jobyer');
    } else if (app.name === 'Hunter') {
      this.sharedService.setProjectTarget('hunter');
    }
    this.router.navigate(['home']);
    //this.chatMessageOpened = true;
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
