import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent, MockProvider } from 'ng-mocks';
import { BehaviorSubject } from 'rxjs';
import { ModalLoginService } from '../../../../services/modal-login/modal-login-service.service';
import { LoginBtnComponent } from './login-btn.component';

describe('LoginBtnComponent', () => {
  let component: LoginBtnComponent;
  let fixture: ComponentFixture<LoginBtnComponent>;
  let btn: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockComponent(LoginBtnComponent)],
      providers: [
        MockProvider(ModalLoginService, {
          isVisible$: new BehaviorSubject(false),
          setModalVisibility: (isVisible) => isVisible$.next(isVisible)
        })
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    btn = fixture.debugElement.query(By.css('.login-btn'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match to snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });

  describe('', () => {
    it('should call handleClick() on click', () => {
      jest.spyOn(component, 'handleClick');
      btn.triggerEventHandler('click', { target: { className: 'login-btn' } });

      expect(component.handleClick).toHaveBeenCalled();
    });

    it('should on handleClick call setModalvisibility in ModalLoginService', () => {
      component.handleClick = jest.fn();

      // expect(fixture.)
    });
  });
});
