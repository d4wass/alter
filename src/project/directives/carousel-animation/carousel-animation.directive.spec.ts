import { AnimationBuilder } from '@angular/animations';
import { SpectatorDirective, createDirectiveFactory } from '@ngneat/spectator';
import { BehaviorSubject } from 'rxjs';
import { CarouselAnimationDirective } from './carousel-animation.directive';

describe('CarouselAnimationDirective', () => {
  let spectator: SpectatorDirective<CarouselAnimationDirective>;
  let directive: CarouselAnimationDirective;
  let animationBuilder: AnimationBuilder;
  const mockOffset = new BehaviorSubject<number>(0);

  const createDirective = createDirectiveFactory({
    directive: CarouselAnimationDirective,
    providers: [
      { provide: 'zone', useValue: { run: jest.fn() } },
      {
        provide: AnimationBuilder,
        useValue: {
          build: jest.fn().mockReturnValue({
            create: jest.fn().mockReturnValue({ onDone: jest.fn(), play: jest.fn() })
          })
        }
      }
    ]
  });

  const selectors = {
    nextBtn: () => spectator.query('.next-btn'),
    prevBtn: () => spectator.query('.prev-btn'),
    carousel: () => spectator.query('.carousel'),
    carouselItems: () => spectator.queryAll('.carousel-items')
  };

  beforeEach(() => {
    spectator = createDirective(`<div appCarouselAnimation>
      <div class="prev-btn" #carouselPrevBtn></div>
      <div class="carousel" #carouselItems>
        <div class="carousel-items"></div>
        <div class="carousel-items"></div>
        <div class="carousel-items"></div>
      </div>
      <div class="next-btn" #carouselNextBtn></div>
    </div>`);
    directive = spectator.directive;
    animationBuilder = spectator.inject(AnimationBuilder);
  });

  it('should create instance of directive', () => {
    expect(directive).toBeTruthy();
    expect(spectator.fixture).toMatchSnapshot();
  });

  it('should call handleClick method on click with correct args', () => {
    const nextBtn = selectors.nextBtn() ?? (selectors.nextBtn() as Element);
    const prevBtn = selectors.prevBtn() ?? (selectors.prevBtn() as Element);
    const spy = jest.spyOn(directive, 'handleClick');
    const animationSpy = jest.spyOn(animationBuilder, 'build');

    spectator.dispatchMouseEvent(prevBtn, 'click');
    expect(spy).toHaveBeenCalledWith('');
    expect(animationSpy).toHaveBeenCalled();
    spectator.dispatchMouseEvent(nextBtn, 'click');
    expect(spy).toHaveBeenCalledWith('-');
    expect(animationSpy).toHaveBeenCalled();
  });
});
