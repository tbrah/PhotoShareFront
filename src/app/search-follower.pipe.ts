import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'followerSearch',
  pure: false
})
export class SearchFollowerPipe implements PipeTransform {

  transform(item: any, searchFollower?: any): any {
    if(searchFollower === undefined){
      return item;
    } else {
      return item.filter(function(item:any){
        return item.followerInfo.username.toLowerCase().includes(searchFollower.toLowerCase());
      });
    }
  }

}
