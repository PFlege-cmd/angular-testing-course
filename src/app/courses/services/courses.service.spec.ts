import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CoursesService} from "./courses.service";
import {COURSES, findLessonsForCourse} from "../../../../server/db-data";
import {Course} from "../model/course";
import {HttpErrorResponse} from "@angular/common/http";

describe("CoursesService", () =>{

  let httpController: HttpTestingController, coursesService: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesService,
      ]
    })

    coursesService = TestBed.inject(CoursesService);
    httpController = TestBed.inject(HttpTestingController);
  });
  it('should retrieve all courses', () => {
    coursesService.findAllCourses().subscribe(courses => {
      expect(courses).toBeTruthy();
      expect(courses.length).toEqual(12);
      const course = courses.find(course => course.id == 12);
      expect(course.titles.description).toBe("Angular Testing Course");
    })

    const req = httpController.expectOne('/api/courses');

    expect(req.request.method).toEqual("GET")

    req.flush({payload: Object.values(COURSES)});
  })

  it('should test find course by Id', () => {
    coursesService.findCourseById(12).subscribe(course => {
      expect(course).toBeTruthy();
      expect(course.id).toEqual(12)
    });

    const req = httpController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('GET');
    req.flush(COURSES[12]);
  })

  it('should return the modified object after "save"-operation', ()=>{
    const changes: Partial<Course> = {
      titles: {
        description: 'Newly saved course'
      }
    };

    coursesService.saveCourse(12, changes).subscribe(course => {
      expect(course.id).toEqual(12);
      expect(course.titles.description).toEqual(changes.titles.description)
    })

    const req = httpController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('PUT');
    req.flush({
      ...COURSES[12],
      ...changes
    })
  })

  it('should throw an error when trying to save a new course', ()=> {
    const changes: Partial<Course> = {
      titles: {
        description: 'Newly saved course'
      }
    };

    coursesService.saveCourse(12, changes).subscribe(() => {
        fail('Should return an http-error');
      }, error => {
        expect(error).toBeInstanceOf(HttpErrorResponse);
        expect(error.status).toEqual(500)
        expect(error.statusText).toEqual('Http-request failed');
      }
    );

    const req =  httpController.expectOne('/api/courses/12');

    expect(req.request.method).toEqual('PUT');

    req.flush('Save course failed', {
      status: 500, statusText: 'Http-request failed'
    });
  });

  it('Should return a lesson afterwards', () => {
    coursesService.findLessons(12).subscribe(lesson => {
      expect(lesson).toBeTruthy();
      expect(lesson.length).toEqual(3);
    });

    const req = httpController.expectOne('/api/lessons?courseId=12&filter=&sortOrder=asc&pageNumber=0&pageSize=3');

    expect(req.request.method).toEqual('GET')

    req.flush({payload: Object.values(findLessonsForCourse(12)).slice(0,3)})
  })
  afterEach(() => {
    httpController.verify();
  })
})
