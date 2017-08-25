import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[StopPropagation]'
})
export class StopPropagationDirective {

  /**
   * Stops the clickevent behind the clicked
   * element to be fired.
   * @param {eventData} event 
   */
   @HostListener("click", ["$event"])
    public onClick(event: any): void
    {
        event.stopPropagation();
    }

  constructor() { }

}
