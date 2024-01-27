import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';

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
          <app-car-card *ngFor="let item of carCards" [carCard]="item" #carouselItem></app-car-card>
        </div>
        <div (click)="handleClick()" class="nav-btn">
          <img src="assets/angle-right.svg" />
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./carousel-section.component.scss']
})
export class CarouselSectionComponent {
  carCards = carCards;
  time = '250ms ease-in';
  private player!: AnimationPlayer;
  offset: number = 0;

  constructor(private animationBuilder: AnimationBuilder) {}
  //todo: whats the difference between viewChild and ViewChildren
  @ViewChild('carousel') private carousel!: ElementRef;
  // @ViewChildren('carouselItem') private carouselItems!: QueryList<CarCardComponent>;

  //add proper types for all
  handleClick(direction?: string): void {
    const carouselItems: HTMLElement[] = [...this.carousel.nativeElement.children];
    const itemWidth = carouselItems[0].clientWidth;
    const carouselAnimation = this.buildAnimation(itemWidth, direction);

    carouselItems.forEach((item) => {
      this.player = carouselAnimation.create(item);
      this.player.play();
    });
  }

  private buildAnimation(itemWidth: number, direction: string = '') {
    this.offset = direction ? this.offset - itemWidth : this.offset + itemWidth;
    return this.animationBuilder.build([
      animate(this.time, style({ transform: `translateX(${this.offset}px)` }))
    ]);
  }
}
