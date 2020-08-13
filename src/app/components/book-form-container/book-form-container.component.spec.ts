import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFormContainerComponent } from './book-form-container.component';

describe('BookFormContainerComponent', () => {
  let component: BookFormContainerComponent;
  let fixture: ComponentFixture<BookFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
