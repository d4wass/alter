import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ElementRef,
  Component,
  ViewChild,
  ViewChildren,
  ContentChild
} from '@angular/core';
import { CarouselAnimationDirective } from '../../../directives/carousel-animation/carousel-animation.directive';

const carCards = [
  { title: '1', img: 'assets/car.png' },
  { title: '2', img: 'assets/car.png' },
  { title: '3', img: 'assets/car.png' },
  { title: '4', img: 'assets/car.png' },
  { title: '5', img: 'assets/car.png' },
  { title: '6', img: 'assets/car.png' },
  { title: '7', img: 'assets/car.png' },
  { title: '8', img: 'assets/car.png' },
  { title: '9', img: 'assets/car.png' },
  { title: '10', img: 'assets/car.png' },
  { title: '11', img: 'assets/car.png' }
];

@Component({
  selector: 'app-carousel-section',
  template: `
    <div class="carousel-section">
      <h1>Browse by make</h1>
      <div class="carousel-content" appCarouselAnimation>
        <div class="nav-btn-prev" #carouselPrevBtn>
          <img src="assets/angle-left.svg" />
        </div>
        <div class="car-card-wrapper" #carouselItems>
          <app-car-card
            *ngFor="let item of carCards"
            #carouselCards
            [carCard]="item"
          ></app-car-card>
        </div>
        <div class="nav-btn-next" #carouselNextBtn>
          <img src="assets/angle-right.svg" />
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./carousel-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselSectionComponent implements AfterViewInit {
  carCards = carCards;
  time = '250ms ease-in';
  private player!: AnimationPlayer;
  private carouselWidth!: number;
  private displayedItems!: number; //Todo: rename to numberOfDisplayedItems
  private offset: number = 0;

  private carouselItems!: HTMLElement[]; //Todo: rename to allCarouselItems
  private displayedCarouselItems: HTMLElement[] = [];
  private nonDisplayedCarouselItems: HTMLElement[] = [];

  // constructor(private animationBuilder: AnimationBuilder) {}
  // @ViewChild('carouselItems') private carousel!: ElementRef;

  ngAfterViewInit(): void {
    // this.carouselItems = [...this.carousel.nativeElement.children];
    // setTimeout(() => {
    //   this.carouselWidth = this.carousel.nativeElement.clientWidth;
    //   this.displayedItems = Math.floor(
    //     this.roundNumber(this.carouselWidth / this.carouselItems[0].clientWidth)
    //   );
    //   this.displayedCarouselItems.push(...this.carouselItems.slice(0, this.displayedItems));
    //   this.nonDisplayedCarouselItems.push(...this.carouselItems.slice(this.displayedItems));
    console.log('lkdsjalkdj');
    // });
  }

  // //add proper types for all
  // handleClick(direction: string): void {
  //   this.offset = this.handleCarouselMove(direction);
  //   const carouselAnimation = this.buildAnimation();

  //   this.carouselItems.forEach((item) => {
  //     this.player = carouselAnimation.create(item);
  //     this.player.onDone(() => {});
  //     this.player.play();
  //   });
  // }

  // private buildAnimation() {
  //   return this.animationBuilder.build([
  //     animate(this.time, style({ transform: `translateX(${this.offset}px)` }))
  //   ]);
  // }

  // private handleCarouselMove(direction: string): any {
  //   const itemWidth = this.carouselItems[0].clientWidth;
  //   const visibleItems = Math.floor(this.roundNumber(this.carouselWidth / itemWidth));
  //   const movePx = this.calculateCarouselMovePx(itemWidth, visibleItems, direction);

  //   let newOffset = this.offset;
  //   if (newOffset === 0 && direction === '') {
  //     newOffset = 0;
  //   } else {
  //     newOffset = direction ? newOffset - movePx : newOffset + movePx;
  //   }

  //   return newOffset;
  // }

  // private calculateCarouselMovePx(
  //   itemWidth: number,
  //   visibleItems: number,
  //   direction: string
  // ): number {
  //   if (this.nonDisplayedCarouselItems.length === 0 && direction !== '-') {
  //     this.nonDisplayedCarouselItems = [...this.displayedCarouselItems.slice(-visibleItems)];
  //     this.displayedCarouselItems = [
  //       ...this.displayedCarouselItems.splice(0, this.displayedCarouselItems.length - visibleItems)
  //     ];
  //   }

  //   if (this.displayedCarouselItems.length === 0) {
  //     this.displayedCarouselItems = [...this.nonDisplayedCarouselItems.slice(-visibleItems)];
  //     this.nonDisplayedCarouselItems = [
  //       ...this.nonDisplayedCarouselItems.splice(
  //         0,
  //         this.nonDisplayedCarouselItems.length - visibleItems
  //       )
  //     ];
  //   }

  //   let displayed = this.displayedCarouselItems;
  //   let nonDisplayed = this.nonDisplayedCarouselItems;
  //   let howManyItemMove = 0;

  //   if (direction === '-') {
  //     howManyItemMove =
  //       visibleItems >= this.nonDisplayedCarouselItems.length
  //         ? this.nonDisplayedCarouselItems.length
  //         : visibleItems;
  //     displayed = [...displayed, ...nonDisplayed.slice(0, visibleItems)];
  //     nonDisplayed = [
  //       ...nonDisplayed.slice(
  //         visibleItems >= nonDisplayed.length ? nonDisplayed.length : visibleItems
  //       )
  //     ];
  //   } else {
  //     howManyItemMove =
  //       visibleItems >= this.displayedCarouselItems.length
  //         ? this.displayedCarouselItems.length
  //         : visibleItems;
  //     nonDisplayed = [...nonDisplayed, ...displayed.slice(-visibleItems)];
  //     displayed = [
  //       ...displayed.slice(visibleItems >= displayed.length ? displayed.length : visibleItems)
  //     ];
  //   }

  //   this.displayedCarouselItems = displayed;
  //   this.nonDisplayedCarouselItems = nonDisplayed;

  //   let movePx = howManyItemMove * itemWidth;

  //   return movePx;
  // }

  // private roundNumber(num: number): number {
  //   return Math.round((num + Number.EPSILON) * 100) / 100;
  // }
}
