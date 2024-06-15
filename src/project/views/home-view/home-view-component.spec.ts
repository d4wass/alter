import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';
import {
  AppSettingsFacadeMock,
  AppSettingsFacadeMockProvider
} from '../../../+state/facade/app-state/app-state.facade.mock';
import { TitleHeaderModule } from '../../../project/components/molecules/title-header/title-header.module';
import { CarouselSectionModule } from '../../../project/components/organisms/carousel-section/carousel-section.module';
import { FaqSectionModule } from '../../../project/components/organisms/faq-section/faq-section.module';
import { HomeViewComponent } from './home-view-component';

describe('HomeViewComponentComponent', () => {
  let component: HomeViewComponent;
  let spectator: Spectator<HomeViewComponent>;
  let appFacade: AppSettingsFacadeMock;

  const createComponent = createComponentFactory({
    component: HomeViewComponent,
    shallow: true,
    imports: [
      MockModule(TitleHeaderModule),
      MockModule(FaqSectionModule),
      MockModule(CarouselSectionModule)
    ],
    providers: [AppSettingsFacadeMockProvider]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    appFacade = spectator.inject(AppSettingsFacadeMock);
  });

  it('should match to snapshot and be defined', () => {
    expect(spectator.fixture).toMatchSnapshot();
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set cars$ value on init', () => {
      const vehicleBrands = ['Car 1', 'Car 2'];
      const expected = vehicleBrands.map((brand) => ({ title: brand, img: 'assets/car.png' }));
      appFacade.vehicleBrands$.next(vehicleBrands);

      component.ngOnInit();

      component.cars$.subscribe((cars) => {
        expect(cars).toEqual(expected);
      });
    });
  });
});
