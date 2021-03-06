import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesListComponent } from './matches-list.component';

describe('MatchesListComponent', () => {
  let component: MatchesListComponent;
  let fixture: ComponentFixture<MatchesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
