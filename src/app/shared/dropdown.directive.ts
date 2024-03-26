import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[app-dropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;

    @HostListener('click') toogleOpen() {
        this.isOpen = !this.isOpen

        console.log("bla");
    }    
}