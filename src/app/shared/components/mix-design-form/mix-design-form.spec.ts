import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixDesignForm } from './mix-design-form';

describe('MixDesignForm', () => {
  let component: MixDesignForm;
  let fixture: ComponentFixture<MixDesignForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixDesignForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MixDesignForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
