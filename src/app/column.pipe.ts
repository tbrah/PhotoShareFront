import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'column'
})
export class ColumnPipe implements PipeTransform {

  transform(array: any, columnNumber?: any, iIncrease?:number, component?:string): any {
    if(component == "discover"){
        let columnArray = [];
        for (var index = columnNumber; index < array.length; index = index + iIncrease) {
          var element = array[index];
          columnArray.push(element);
        }
        return columnArray;
    } else {
      return array;
    }

  }

}
