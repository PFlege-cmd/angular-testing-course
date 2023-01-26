import {CalculatorService} from './calculator.service';
import {LoggerService} from "./logger.service";
import {TestBed} from "@angular/core/testing";

describe('CalculatorService', () => {

  let calculatorService: CalculatorService, loggerSpy: any, testBed: TestBed;

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
    TestBed.configureTestingModule({
      providers: [
        {provide: LoggerService, useValue: loggerSpy},
        CalculatorService
      ]
    });

    calculatorService = TestBed.inject(CalculatorService);

  });

  xit('should add up two numbers.', () => {

    const additionResult = calculatorService.add(2, 2);

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    expect(additionResult).toBe(4)
  })

  it('should subtract two numbers.', () => {

    const additionResult = calculatorService.subtract(2, 2);

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    expect(additionResult).toBe(0)
  })
});
