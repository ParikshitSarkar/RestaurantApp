import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DishCommentsPage } from './dish-comments.page';

describe('DishCommentsPage', () => {
  let component: DishCommentsPage;
  let fixture: ComponentFixture<DishCommentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishCommentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DishCommentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
