import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesListContainerComponent } from './matches-list-container.component';

describe('MatchesListContainerComponent', () => {
  let component: MatchesListContainerComponent;
  let fixture: ComponentFixture<MatchesListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchesListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
