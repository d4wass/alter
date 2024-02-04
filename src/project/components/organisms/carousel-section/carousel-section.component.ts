import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { iif } from 'rxjs';
import { CarCardComponent } from '../../molecules/car-card/car-card.component';

const carCards = [
  { title: 'BMW', img: 'assets/car.png' },
  { title: 'Toyota', img: 'assets/car.png' },
  { title: 'Mazda', img: 'assets/car.png' },
  { title: 'Jeep', img: 'assets/car.png' },
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
  offset: number = 0;

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

  private checkCurrentOffset(direction: string, itemWidth: number, maxOffset: number): number {
    let newOffset = this.offset;

    if (direction === '' && newOffset === 0) return (newOffset = 0);
    if (direction === '-' && newOffset === 0) return (newOffset = newOffset - itemWidth);
    if (direction === '-' && newOffset <= -maxOffset) return (newOffset = -maxOffset);
    if (direction === '' && newOffset > 0) return (newOffset = 0);

    return direction ? newOffset - itemWidth : newOffset + itemWidth;
  }
}
