import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';

const carCards = [
  { title: 'BMW', img: 'assets/car.png' },
  { title: 'Toyota', img: 'assets/car.png' },
  { title: 'Mazda', img: 'assets/car.png' },
  { title: 'Jeep', img: 'assets/car.png' },
  { title: 'Mercedes-Benz', img: 'assets/car.png' },
  { title: 'Mercedes-Benz', img: 'assets/car.png' },
  { title: 'Mercedes-Benz', img: 'assets/car.png' },
  { title: 'Mercedes-Benz', img: 'assets/car.png' },
  { title: 'Mercedes-Benz', img: 'assets/car.png' },
  { title: 'Mercedes-Benz', img: 'assets/car.png' },
  { title: 'Mercedes-Benz', img: 'assets/car.png' }
];

@Component({
  selector: 'app-carousel-section',
  template: `
    <div class="carousel-section">
      <h1>Browse by make</h1>
      <div class="carousel-content">
        <div (click)="handleClick('-')" class="nav-btn">
          <img src="assets/angle-left.svg" />
        </div>
        <div class="car-card-wrapper" #carousel>
          <app-car-card
            *ngFor="let item of carCards"
            #carouselCards
            [carCard]="item"
          ></app-car-card>
        </div>
        <div (click)="handleClick('')" class="nav-btn">
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
  private carouselItems!: HTMLElement[];
  private carouselWidth!: number;
  private counter = 0;
  private offset: number = 0;

  constructor(private animationBuilder: AnimationBuilder, private cdr: ChangeDetectorRef) {}
  //todo: whats the difference between viewChild and ViewChildren
  @ViewChild('carousel') private carousel!: ElementRef;
  @ViewChildren('carouselCards') private carouselCards!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    console.log(this.carousel);
    console.log(this.carouselCards);
    this.carouselItems = [...this.carousel.nativeElement.children];
    this.carouselWidth = this.carousel.nativeElement.clientWidth;
  }

  //add proper types for all
  handleClick(direction: string): void {
    const itemWidth = this.carouselItems[0].clientWidth;
    const maxOffset = this.carouselItems.length * itemWidth - this.carouselWidth;
    this.offset = this.checkCurrentOffset(direction, itemWidth, maxOffset);
    const carouselAnimation = this.buildAnimation();

    this.carouselItems.forEach((item) => {
      this.player = carouselAnimation.create(item);
      this.player.onDone(() => {});
      this.player.play();
    });

    console.log('3', this.offset);
  }

  private buildAnimation() {
    console.log('buildAnimation', this.offset);
    return this.animationBuilder.build([
      animate(this.time, style({ transform: `translateX(${this.offset}px)` }))
    ]);
  }

  private counterDirectionControl(direction: string, maxCounterValue: number): void {
    let counter = this.counter;
    if (direction === '' && this.counter !== 0) {
      --counter;
      this.counter = counter;
    }

    if (direction === '-' && this.counter === maxCounterValue) {
      this.counter = counter;
    } else if (direction === '-') {
      ++counter;
      this.counter = counter;
    }
  }

  private checkCurrentOffset(direction: string, itemWidth: number, maxOffset: number): number {
    let newOffset = this.offset;
    const num = this.carouselWidth / this.carouselItems[0].clientWidth;
    const roundedNum = this.roundNumber(num); // how many entire cards I can display for user
    const numerOfClicksToDisplayLastCard = this.carouselItems.length - Math.floor(roundedNum) - 1;
    //! watch for negative in case for roundedNum !
    const movePx = itemWidth * this.roundNumber(roundedNum - Math.floor(roundedNum)) + 25 + 20;
    // console.log(roundedNum);
    // console.log(movePx);
    // console.log(this.counter, 'lastClick', numerOfClicksToDisplayLastCard);
    this.counterDirectionControl(direction, numerOfClicksToDisplayLastCard);
    console.log(this.counter);

    if (direction === '' && newOffset === 0) return (newOffset = 0);
    if (direction === '-' && newOffset === 0) return (newOffset = newOffset - itemWidth);
    if (direction === '-' && newOffset !== 0 && this.counter === numerOfClicksToDisplayLastCard)
      return (newOffset = newOffset - movePx);
    if (direction === '-' && newOffset <= -maxOffset) return (newOffset = -maxOffset - 29);
    if (direction === '' && newOffset > 0) return (newOffset = 0);

    return direction ? newOffset - itemWidth : newOffset + itemWidth;
  }

  private roundNumber(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }
}
