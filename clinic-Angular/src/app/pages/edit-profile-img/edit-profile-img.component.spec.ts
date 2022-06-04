import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileImgComponent } from './edit-profile-img.component';

describe('EditProfileImgComponent', () => {
  let component: EditProfileImgComponent;
  let fixture: ComponentFixture<EditProfileImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
