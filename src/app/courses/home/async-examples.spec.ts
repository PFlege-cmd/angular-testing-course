import {fakeAsync, flush, flushMicrotasks, tick} from '@angular/core/testing';
import {of} from "rxjs";
import {delay} from "rxjs/operators";



describe('Async Testing Examples', () => {

    it('Asynchronous test example with Jasmine done()', (done) => {

      let flag = false;

      setTimeout(()=>{
        flag = true;

        console.log('Am in timeout-callback right now!');

        expect(flag).toBe(true);

        done();
      }, 500)
    });


    it('Asynchronous test example - setTimeout()', fakeAsync(() => {

      let test = false;

      setTimeout(() => {
        console.log('In async timeout');
        test = true;
      }, 100000000);
      flush();
      expect(test).toBe(true)
    }));


    it('Asynchronous test example - plain Promise', fakeAsync(() => {
      let test = false;

      console.log('Outside promise');

      Promise.resolve().then(()=>{
        console.log('Inside promise')
        test = true;
      })

      flushMicrotasks();

      expect(test).toBe(true);
    }));


    it('Asynchronous test example - Promises + setTimeout()', fakeAsync(() => {

    let counter = 0;

    console.log('Outside async - operations');

    Promise.resolve().then(() => {

      console.log('In Promise');

      counter += 10;

      setTimeout(() => {
          console.log('In timeout');
          counter += 1;
        }, 1000);
      });

      expect(counter).toBe(0);

      flushMicrotasks()

      expect(counter).toBe(10);

      tick(500);

      expect(counter).toBe(10);

      tick(500);

      expect(counter).toBe(11);
    }));

    it('Asynchronous test example - Observables', fakeAsync(() => {
        let test = false;

        const test$ = of(test).pipe(delay(1000));

        test$.subscribe(() => {
          test = true;
        });

        tick(1000);

        expect(test).toBe(true);
    }));
});
















