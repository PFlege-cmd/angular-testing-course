import { ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick, waitForAsync } from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';
import {HomeComponent} from './home.component';
import {CoursesService} from '../services/courses.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {setupCourses} from "../common/setup-test-data";
import {By} from "@angular/platform-browser";
import {of} from "rxjs";

describe('HomeComponent', () => {

  let component: HomeComponent;
  let el: DebugElement;
  let fixture: ComponentFixture<HomeComponent>;
  let coursesServiceSpy: any;
  const beginnerCourses = setupCourses().filter(course => course.category === 'BEGINNER');
  const advancedCourses = setupCourses().filter(course => course.category === 'ADVANCED');


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoursesModule, NoopAnimationsModule],
      providers: [{
        provide: CoursesService,
        useValue: jasmine.createSpyObj('CoursesService', ['findAllCourses'])}]
      }).compileComponents().then(() =>{
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      }
    );
    coursesServiceSpy = TestBed.inject(CoursesService);
    }))

  it("should create the component", () => {

    expect(component).toBeTruthy();

  });


  it("should display only beginner courses", () => {
    coursesServiceSpy.findAllCourses.and.returnValue(of(beginnerCourses));

    fixture.detectChanges();

    const beginnerCoursesTabs = el.queryAll(By.css('.mdc-tab'));

    expect(beginnerCoursesTabs.length).withContext('Found more tabs than expected').toBe(1);
  });


  it("should display only advanced courses", () => {
      coursesServiceSpy.findAllCourses.and.returnValue(of(advancedCourses));

      fixture.detectChanges();

      const advancedCoursesTabs = el.queryAll(By.css('.mdc-tab'));

      expect(advancedCoursesTabs.length).withContext('Found more tabs than expected').toBe(1);
  });


  it("should display both tabs", () => {
    coursesServiceSpy.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const bothCoursesTabs = el.queryAll(By.css('.mdc-tab'));

    expect(bothCoursesTabs.length).withContext('Found more tabs than expected').toBe(2)
  });


  fit("should display advanced courses when tab clicked - fakeAsync", fakeAsync(() => {
      coursesServiceSpy.findAllCourses.and.returnValue(of(setupCourses()));

      fixture.detectChanges();

      const tabs = el.queryAll(By.css('.mdc-tab'));

      tabs[1].nativeElement.click();

      fixture.detectChanges();

      tick(1000);
      const displayedCourses =  el.queryAll(By.css('.mat-mdc-card-title'));

      expect(displayedCourses.length).toBeGreaterThan(0);

      expect(displayedCourses[0].nativeElement.textContent).toEqual('Angular Testing Course');
  }));


    // it("should display advanced courses when tab clicked - async", waitForAsync(() => {
    //
    //     pending();
    //
    // }));
});





















