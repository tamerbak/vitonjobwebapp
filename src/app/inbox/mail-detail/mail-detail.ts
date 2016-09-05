import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: '[mail-detail]',
  template: require('./mail-detail.html'),
  styles: [require('./mail-detail.scss')]
})
export class MailDetail {
  @Input() mail: any;
  @Output() backToMailList = new EventEmitter();
  @Output() replyMessage = new EventEmitter();
  math = Math;
  onToBack(): void {
    this.backToMailList.emit('');
  }

  goToReply(mail): void {
    this.replyMessage.emit(mail);
  }

  Math(): number {
    return Math.random();
  }
}

