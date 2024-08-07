import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatText'
})
export class FormatTextPipe implements PipeTransform {

  transform(name: string, lastName: string, id: string): string {
    return `გამარჯობა: ${name} ${lastName}, თქვენი პირადი ნომერი არის:  ${id}`;
  }

}
