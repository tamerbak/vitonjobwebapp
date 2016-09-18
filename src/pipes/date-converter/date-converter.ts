import {Pipe} from '@angular/core';

@Pipe({
  name: 'dateConverter'
})
export class DateConverter {

  longDateOptions = {
    weekday: "long", month: "long", year: "numeric",
    day: "numeric"
  };

  shortDateOptions = {
    month: "numeric", year: "numeric", day: "numeric"
  };

  transform(value, args) {
    if (args == 'long') {
      return new Date(value.replace(' ', 'T')).toLocaleDateString('fr-FR', this.longDateOptions);
    }
    if (args == 'short') {
      return new Date(value.replace(' ', 'T')).toLocaleDateString('fr-FR', this.shortDateOptions);
    }
  }
}
