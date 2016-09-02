import {Component, ElementRef, OnInit} from '@angular/core';
import {MailList} from './mail-list/mail-list';
import {MailForm} from './mail-form/mail-form';
import {MailDetail} from './mail-detail/mail-detail';
declare var jQuery: any;

@Component({
  selector: 'inbox',
  template: require('./inbox.html'),
  directives: [MailList, MailForm, MailDetail],
  styles: [require('./inbox.scss')]
})

export class Inbox implements OnInit {
  mailListShow: boolean = true;
  mailFormShow: boolean = false;
  mailDetailShow: boolean = false;
  currentMail: any;
  currentFolderName: string = 'Inbox';
  $el: any;
  repliedMessage: any;

  constructor(el: ElementRef) {
    this.$el = jQuery(el.nativeElement);

    this.initMailboxAppDemo(this.$el);
  }

  handleComposeBtn(event): void {
    this.repliedMessage = event || undefined;
    this.changeEmailComponents('mailForm');
  }

  onReplyMail(mail: any): void {
    this.currentMail = mail;
    this.changeEmailComponents('mailDetail');
  }

  changeEmailComponents(componentName: string): void {
    let mailState = {
      'mailList': (that): void => {
        that.mailFormShow = that.mailDetailShow = false;
        that.mailListShow = true;
      },

      'mailForm': (that): void => {
        that.mailListShow = that.mailDetailShow = false;
        that.mailFormShow = true;
      },

      'mailDetail': (that): void => {
        that.mailListShow = that.mailFormShow = false;
        that.mailDetailShow = true;
      },
    };

    mailState[componentName](this);
  }

  setFolderName(folderName: string): void {
    this.currentFolderName = folderName;
  }

  initMailboxAppDemo($el: any): void {
    let showAlert = function(): void {
      $el.find('#app-alert')
        .removeClass('hide')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(): void {
          jQuery(this).removeClass('animated bounceInLeft');
        });
    };

    setTimeout(() => showAlert(), 3000);
  }

  changeActiveItem(): void {
    this.$el.find('.nav a').on('click', function(): void {
      jQuery('.nav').find('.active').removeClass('active');
      jQuery(this).parent().addClass('active');
    });
  }

  ngOnInit(): void {
    this.changeActiveItem();
  }
}
