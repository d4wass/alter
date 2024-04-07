import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { AfterViewInit, ContentChild, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCarouselAnimation]',
  standalone: true
})
export class CarouselAnimationDirective implements AfterViewInit {
  private allCarouselItems: HTMLElement[] = [];
  private displayedCarouselItems: HTMLElement[] = [];
  private nonDisplayedCarouselItems: HTMLElement[] = [];
  private carouselWidth: number = 0;
  private carouselItemWidth: number = 0;
  private carouselOffset: number = 0;
  private displayedItems!: number;
  private time = '250ms ease-in';
  private player!: AnimationPlayer;

  @ContentChild('carouselPrevBtn') prevBtn!: ElementRef;
  @ContentChild('carouselItems') carousel!: ElementRef;
  @ContentChild('carouselNextBtn') nextBtn!: ElementRef;
  constructor(private animationBuilder: AnimationBuilder) {}

  ngAfterViewInit(): void {
    this.allCarouselItems = [...this.carousel.nativeElement.children];
    setTimeout(() => {
      this.carouselWidth = this.carousel.nativeElement.clientWidth;
      this.carouselItemWidth = this.allCarouselItems[0].clientWidth;
      this.displayedItems = this.numberOfDisplayedCarouselItems(
        this.carouselWidth,
        this.carouselItemWidth
      );
      this.displayedCarouselItems.push(...this.allCarouselItems.slice(0, this.displayedItems));
      this.nonDisplayedCarouselItems.push(...this.allCarouselItems.slice(this.displayedItems));
    });

    this.prevBtn.nativeElement.addEventListener('click', () => this.handleClick(''));
    this.nextBtn.nativeElement.addEventListener('click', () => this.handleClick('-'));
  }

  handleClick(direction: string) {
    this.playCarouselAnimation(direction);
  }

  private playCarouselAnimation(direction: string): void {
    this.carouselOffset = this.handleCarouselMove(direction);
    const carouselAnimation = this.buildAnimation();

    this.allCarouselItems.forEach((item) => {
      this.player = carouselAnimation.create(item);
      this.player.onDone(() => {});
      this.player.play();
    });
  }

  private numberOfDisplayedCarouselItems(carouselWidth: number, carouselItemWidth: number): number {
    const numberOfDiplayedItems = carouselWidth / carouselItemWidth;
    return Math.floor(Math.round((numberOfDiplayedItems + Number.EPSILON) * 100) / 100);
  }

  private buildAnimation() {
    return this.animationBuilder.build([
      animate(this.time, style({ transform: `translateX(${this.carouselOffset}px)` }))
    ]);
  }

  private handleCarouselMove(direction: string): number {
    const movePx = this.calculateCarouselMovePx(
      this.carouselItemWidth,
      this.displayedItems,
      direction
    );

    let newOffset = this.carouselOffset;
    if (newOffset === 0 && direction === '') {
      newOffset = 0;
    } else {
      newOffset = direction ? newOffset - movePx : newOffset + movePx;
    }

    return newOffset;
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
