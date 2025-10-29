import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixDesign } from './mix-design';

describe('MixDesign', () => {
  let component: MixDesign;
  let fixture: ComponentFixture<MixDesign>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixDesign]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MixDesign);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
