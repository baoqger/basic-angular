import { Component, OnInit } from '@angular/core';
import { timer } from "rxjs";
import { Store, select, createSelector, MemoizedSelector } from "@ngrx/store";
import { defaultMemoize, pureFunction, MemoizedProjection } from "./TS-test/memoized";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'basic-angular';
  number: number;
  // memoizedFunction: MemoizedSelector;
  ngOnInit(): void {
    timer(2000,2000).subscribe((res) => {
      this.number = res;
    })

    this.testMemoize();
    
  }

  testMemoize(): void {
    const memoizedFunction = defaultMemoize(pureFunction);
    console.log("debug", memoizedFunction.memoized(1));
    console.log("debug", memoizedFunction.memoized(1));
    console.log("debug", memoizedFunction.memoized(1));
    console.log("debug", memoizedFunction.memoized(2));
  }

  public handleClick(): void {
    this.testMemoize();
  }
}
