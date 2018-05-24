import {  Pipe } from '@angular/core';

@Pipe({
  name: 'hoursMinutesSeconds'
})

export class HoursMinutesSecondsPipe {

  transform(value, args?) {

    let minutes = Math.floor(value / 60);
    let hours = Math.floor(minutes / 60);
    let seconds = Math.floor(value % 60);

    return hours + " hrs, " + minutes + " mins, " + seconds + " secs";

  }

}
