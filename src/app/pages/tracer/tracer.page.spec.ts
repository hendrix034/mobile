import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TracerPage } from './tracer.page';

describe('TracerPage', () => {
  let component: TracerPage;
  let fixture: ComponentFixture<TracerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TracerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
