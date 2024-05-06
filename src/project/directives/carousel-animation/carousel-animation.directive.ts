import {
  animate,
  AnimationBuilder,
  AnimationFactory,
  AnimationPlayer,
  style
} from '@angular/animations';
import {
  AfterViewInit,
  ContentChild,
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit
} from '@angular/core';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';

@Directive({
  selector: '[appCarouselAnimation]',
  standalone: true
})
export class CarouselAnimationDirective implements AfterViewInit, OnInit, OnDestroy {
  private allCarouselItems: HTMLElement[] = [];
  private displayedCarouselItems: HTMLElement[] = [];
  private nonDisplayedCarouselItems: HTMLElement[] = [];
  private carouselWidth = new BehaviorSubject<number>(0);
  private carouselItemWidth = new BehaviorSubject<number>(0);

  private carouselOffset = new BehaviorSubject<number>(0);
  private displayedItems!: number;
  private time = '350ms ease-in';
  private player!: AnimationPlayer;
  private resizeObserver!: ResizeObserver;

  @ContentChild('carouselPrevBtn') prevBtn!: ElementRef;
  @ContentChild('carouselItems') carousel!: ElementRef;
  @ContentChild('carouselNextBtn') nextBtn!: ElementRef;
  constructor(private animationBuilder: AnimationBuilder, private zone: NgZone) {}

  ngOnInit(): void {
    this.resizeObserver = new ResizeObserver((entries) => {
      this.zone.run(() => {
        this.carouselWidth.next(entries[0].contentRect.width);
        this.carouselItemWidth.next(entries[0].target.children[0].clientWidth);

        this.udpateOffsetOnResize();
      });
    });
  }

  ngOnDestroy(): void {
    this.resizeObserver.unobserve(this.carousel.nativeElement);
  }

  ngAfterViewInit(): void {
    const carouselElement = this.carousel.nativeElement;

    this.allCarouselItems = [...carouselElement.children];
    this.resizeObserver.observe(carouselElement);

    combineLatest([this.carouselWidth, this.carouselItemWidth])
      .pipe(map(([carouselWidth, carouselItemWidth]) => ({ carouselWidth, carouselItemWidth })))
      .subscribe(
        ({ carouselWidth, carouselItemWidth }) =>
          (this.displayedItems = this.numberOfDisplayedCarouselItems(
            carouselWidth,
            carouselItemWidth
          ))
      );

    this.displayedCarouselItems.push(...this.allCarouselItems.slice(0, this.displayedItems));
    this.nonDisplayedCarouselItems.push(...this.allCarouselItems.slice(this.displayedItems));

    this.prevBtn.nativeElement.addEventListener('click', () => this.handleClick(''));
    this.nextBtn.nativeElement.addEventListener('click', () => this.handleClick('-'));
  }

  handleClick(direction: string) {
    this.handleCarouselMove(direction);
  }

  private updateCarouselOffset(offset: number): void {
    this.carouselOffset.next(offset);
    this.playCarouselAnimation();
  }

  private udpateOffsetOnResize(): void {
    const offset =
      (this.displayedCarouselItems.length == 0
        ? this.displayedCarouselItems.length
        : this.displayedCarouselItems.length - this.displayedItems) * this.carouselItemWidth.value;
    console.log(this.displayedItems, this.displayedCarouselItems, offset);
    this.updateCarouselOffset(-offset);
  }

  private playCarouselAnimation(): void {
    const carouselAnimation = this.buildAnimation();

    this.allCarouselItems.forEach((item) => {
      this.player = carouselAnimation.create(item);
      this.player.onDone(() => {});
      this.player.play();
    });
  }

  private numberOfDisplayedCarouselItems(carouselWidth: number, carouselItemWidth: number): number {
    const numberOfDiplayedItems = carouselWidth / carouselItemWidth;
    const num = Math.ceil(Math.round(numberOfDiplayedItems));
    return num;
  }

  private buildAnimation() {
    return this.animationBuilder.build([
      animate(this.time, style({ transform: `translateX(${this.carouselOffset.value}px)` }))
    ]);
  }

  private handleCarouselMove(direction: string): void {
    const movePx = this.calculateCarouselMovePx(
      this.carouselItemWidth.value,
      this.displayedItems,
      direction
    );

    let newOffset = this.carouselOffset.value;
    if (newOffset === 0 && direction === '') {
      newOffset = 0;
    } else {
      newOffset = direction ? newOffset - movePx : newOffset + movePx;
    }

    this.updateCarouselOffset(newOffset);
  }

  private calculateCarouselMovePx(
    carouselItemWidth: number,
    displayedItems: number,
    direction: string
  ): number {
    if (this.nonDisplayedCarouselItems.length === 0 && direction !== '-') {
      this.nonDisplayedCarouselItems = [...this.displayedCarouselItems.slice(-displayedItems)];
      this.displayedCarouselItems = [
        ...this.displayedCarouselItems.splice(
          0,
          this.displayedCarouselItems.length - displayedItems
        )
      ];
    }

    if (this.displayedCarouselItems.length === 0) {
      this.displayedCarouselItems = [...this.nonDisplayedCarouselItems.slice(-displayedItems)];
      this.nonDisplayedCarouselItems = [
        ...this.nonDisplayedCarouselItems.splice(
          0,
          this.nonDisplayedCarouselItems.length - displayedItems
        )
      ];
    }

    let displayed = this.displayedCarouselItems;
    let nonDisplayed = this.nonDisplayedCarouselItems;
    let howManyItemMove = 0;

    if (direction === '-') {
      howManyItemMove =
        displayedItems >= this.nonDisplayedCarouselItems.length
          ? this.nonDisplayedCarouselItems.length
          : displayedItems;
      displayed = [...displayed, ...nonDisplayed.slice(0, displayedItems)];
      nonDisplayed = [
        ...nonDisplayed.slice(
          displayedItems >= nonDisplayed.length ? nonDisplayed.length : displayedItems
        )
      ];
    } else {
      howManyItemMove =
        displayedItems >= this.displayedCarouselItems.length
          ? this.displayedCarouselItems.length
          : displayedItems;
      nonDisplayed = [...nonDisplayed, ...displayed.slice(-displayedItems)];
      displayed = [
        ...displayed.slice(displayedItems >= displayed.length ? displayed.length : displayedItems)
      ];
    }

    this.displayedCarouselItems = displayed;
    this.nonDisplayedCarouselItems = nonDisplayed;

    let movePx = howManyItemMove * carouselItemWidth;

    return movePx;
  }
}
