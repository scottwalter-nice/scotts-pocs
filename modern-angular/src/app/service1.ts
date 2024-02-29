import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class Service1 {

  name = 'Scott Walter';

  getName() {
    return this.name;
  }
}
