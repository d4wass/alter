import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent, MockModule } from 'ng-mocks';
import { CarCardComponent } from '../../molecules/car-card/car-card.component';
import { ReviewCardComponent } from '../../molecules/customer-card/customer-card.component';
import { CarouselSectionComponent } from './carousel-section.component';
import { CarouselEnum } from './carousel.utils';

describe('CarouselSectionComponent', () => {
  let component: CarouselSectionComponent;
  let spectator: Spectator<CarouselSectionComponent>;
  const carouselTitle = 'carousel title';
  const carouselLength = 5;

  const createComponent = createComponentFactory({
    component: CarouselSectionComponent,
    declarations: [MockComponent(CarCardComponent), MockComponent(ReviewCardComponent)],
    imports: [MockModule(MatProgressSpinnerModule)]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    component.items = createMockCarouselItemsArray(carouselLength, {
      title: 'item',
      img: 'assets/car.png'
    } as any);
    component.title = carouselTitle;
    component.carouselType = CarouselEnum.CarCarousel;
    spectator.detectComponentChanges();
  });

  it('should match the snapshot', () => {
    expect(spectator.fixture).toMatchSnapshot();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the carousel title', () => {
    const title = spectator.query('h1')?.textContent;
    expect(title).toEqual(carouselTitle);
  });

  it('should display the correct number of car card elements when carouselType is CarCarousel', () => {
    const carCardElements = spectator.queryAll('app-car-card');
    expect(carCardElements.length).toEqual(carouselLength);
  });

  it('should display the correct number of review card elements when carouselType is ReviewCarousel', () => {
    component.carouselType = CarouselEnum.ReviewCarousel;
    spectator.detectComponentChanges();
    const reviewCardElements = spectator.queryAll('app-review-card');
    expect(reviewCardElements.length).toEqual(carouselLength);
  });

  it('should display a loading spinner when items is not defined or empty array', () => {
    component.items = undefined as any;
    spectator.detectComponentChanges();
    const spinner = spectator.query('mat-spinner');
    expect(spinner).toBeTruthy();
  });
});

function createMockCarouselItemsArray<T>(length: number, value: T): T[] {
  return new Array<T>(length).fill(value);
}
