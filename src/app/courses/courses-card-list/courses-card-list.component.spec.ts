import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CommonModule} from "@angular/common";
import {MatDialogModule} from "@angular/material/dialog";
import {DebugElement} from "@angular/core";
import {setupCourses} from "../common/setup-test-data";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";


describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;

    beforeEach(waitForAsync (()=> {
      TestBed.configureTestingModule(
        {
          imports: [CommonModule, MatDialogModule, RouterTestingModule]
        }
      )
        .compileComponents()
          .then(() => {
          fixture = TestBed.createComponent(CoursesCardListComponent);
          component = fixture.componentInstance;
          el = fixture.debugElement;
      })
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should display the course list', () => {
      component.courses = setupCourses();

      fixture.detectChanges();

      console.log(el.nativeElement.outerHTML);
      const res = el.queryAll(By.css('.course-card'))
      expect(res.length).toEqual(12);
    });

    it('should display the first course', () => {
        component.courses = setupCourses();

        fixture.detectChanges();

        const course = component.courses[0];

        const card = el.query(By.css('.course-card:first-child'));
        const title = card.query(By.css('mat-card-title'));
        const image = card.query(By.css('img'));

        expect(title.nativeElement.textContent).toBe(course.titles.description);
        expect(image.nativeElement.src).toBe(course.iconUrl);
    });
});


