import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
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
    declarations: [MockComponent(CarCardComponent), MockComponent(ReviewCardComponent)]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    component.carouselItems = createMockCarouselItemsArray(carouselLength, 'item');
    component.carouselTitle = carouselTitle;
    component.carouselType = CarouselEnum.CarCarousel;
    component.ngOnInit();
    spectator.detectChanges();
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
    spectator.detectChanges();
    const reviewCardElements = spectator.queryAll('app-review-card');
    expect(reviewCardElements.length).toEqual(carouselLength);
  });
});

function createMockCarouselItemsArray<T>(length: number, value: T): T[] {
  return new Array<T>(length).fill(value);
}
