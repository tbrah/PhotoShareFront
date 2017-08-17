import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImageFeedComponent } from './profile-image-feed.component';

describe('ProfileImageFeedComponent', () => {
  let component: ProfileImageFeedComponent;
  let fixture: ComponentFixture<ProfileImageFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileImageFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileImageFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
