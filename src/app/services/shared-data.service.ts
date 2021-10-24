import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private tabTitle: string = '';
  private tabTitleSub$ = new Subject<string>();
  private backButtonEvent$ = new Subject<boolean>();

  constructor() { }

  getTabTitle(): string{
    return this.tabTitle;
  }

  tabTitle$(): Observable<string>{
    return this.tabTitleSub$.asObservable()
  }

  setTabTitle(title: string){
    this.tabTitle = title;
    this.tabTitleSub$.next(title);
  }

  backButtonPressed(press:boolean){
    this.backButtonEvent$.next(press)
  }

  
  backButton$(): Observable<boolean>{
    return this.backButtonEvent$.asObservable()
  }
}
