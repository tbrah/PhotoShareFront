import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileReferenceComponent } from './profile-reference.component';

describe('ProfileReferenceComponent', () => {
  let component: ProfileReferenceComponent;
  let fixture: ComponentFixture<ProfileReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
