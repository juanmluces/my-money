import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private tabTitle: string = '';
  private tabTitleSub$ = new Subject<string>();
  private backButtonEvent$ = new Subject<boolean>();
  private langStr$ = new Subject<string>()
  private newCycleBool$ = new Subject<boolean>();

  constructor(private translate: TranslateService) { }


  newCycle$(): Observable<boolean>{
    return this.newCycleBool$.asObservable()
  }
  createNewCycle(): void{
    this.newCycleBool$.next(true)
  }


  translate$(): Observable<string>{
    return this.langStr$.asObservable()
  }

  updateLang(){
    this.langStr$.next(this.translate.currentLang)
  }

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
