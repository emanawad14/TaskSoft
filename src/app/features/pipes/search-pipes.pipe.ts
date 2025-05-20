import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipes'
})
export class SearchPipesPipe implements PipeTransform {

  transform(arrayofObject:any[],text:string): any[] {
    return arrayofObject.filter( (item)=>item.empName.includes(text) );
  }

}
