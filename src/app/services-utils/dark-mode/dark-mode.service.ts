import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  constructor() {}

  private isDarkMode = new BehaviorSubject<boolean>(false);
  currentMode$ = this.isDarkMode.asObservable();

  toggleDarkMode() {
    const newMode = !this.isDarkMode.value;
    this.isDarkMode.next(newMode);
  }
}
