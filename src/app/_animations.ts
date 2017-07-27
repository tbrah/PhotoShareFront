// import the required animation functions from the angular animations module
import { trigger, state, animate, transition, style } from '@angular/animations';
 
export const FadeInAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('FadeInAnimation', [
 
        // route 'enter' transition
        transition(':enter', [
 
            // css styles at start of transition
            style({ opacity: 0 }),
 
            // animation and styles at end of transition
            animate('.8s', style({ opacity: 1 }))
        ]),
    ]);

export const FadeInAnimationFast = 
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('FadeInAnimationFast', [
 
        // route 'enter' transition
        transition(':enter', [
 
            // css styles at start of transition
            style({ opacity: 0 }),
 
            // animation and styles at end of transition
            animate('.6s', style({ opacity: 1 }))
        ]),
    ]);