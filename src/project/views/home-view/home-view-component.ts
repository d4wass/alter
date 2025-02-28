import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppSettingFacade } from '../../../+state/facade/app-state/app-settings.facade';
import { CarouselEnum } from '../../components/organisms/carousel-section/carousel.utils';

const reviewsData = [
  {
    img: 'assets/reviewUser.png',
    name: 'Name',
    surname: 'Surname',
    status: 'All-star Host',
    stats: { trips: 10, joined: 'Jan 2016' },
    review:
      'Ran well. Very convenient check in and check out. I was using it to move some small pelican cases, so loading into th...',
    rate: 3
  },
  {
    img: 'assets/reviewUser.png',
    name: 'Name',
    surname: 'Surname',
    status: 'All-star Host',
    stats: { trips: 20, joined: 'Jan 2016' },
    review:
      'Ran well. Very convenient check in and check out. I was using it to move some small pelican cases, so loading into th...',
    rate: 4
  },
  {
    img: 'assets/reviewUser.png',
    name: 'Name',
    surname: 'Surname',
    status: 'All-star Host',
    stats: { trips: 30, joined: 'Jan 2016' },
    review:
      'Ran well. Very convenient check in and check out. I was using it to move some small pelican cases, so loading into th...',
    rate: 5
  },
  {
    img: 'assets/reviewUser.png',
    name: 'Name',
    surname: 'Surname',
    status: 'All-star Host',
    stats: { trips: 40, joined: 'Jan 2016' },
    review:
      'Ran well. Very convenient check in and check out. I was using it to move some small pelican cases, so loading into th...',
    rate: 2
  },
  {
    img: 'assets/reviewUser.png',
    name: 'Name',
    surname: 'Surname',
    status: 'All-star Host',
    stats: { trips: 30, joined: 'Jan 2016' },
    review:
      'Ran well. Very convenient check in and check out. I was using it to move some small pelican cases, so loading into th...',
    rate: 5
  },
  {
    img: 'assets/reviewUser.png',
    name: 'Name',
    surname: 'Surname',
    status: 'All-star Host',
    stats: { trips: 40, joined: 'Jan 2016' },
    review:
      'Ran well. Very convenient check in and check out. I was using it to move some small pelican cases, so loading into th...',
    rate: 2
  },
  {
    img: 'assets/reviewUser.png',
    name: 'Name',
    surname: 'Surname',
    status: 'All-star Host',
    stats: { trips: 40, joined: 'Jan 2016' },
    review:
      'Ran well. Very convenient check in and check out. I was using it to move some small pelican cases, so loading into th...',
    rate: 2
  }
];

@Component({
  selector: 'app-home-view-component',
  templateUrl: './home-view-component.html',
  styleUrls: ['./home-view-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewComponent implements OnInit {
  constructor(private appSettingsFacade: AppSettingFacade) {}
  cars$!: Observable<{ title: string; img: string }[]>;

  ngOnInit(): void {
    this.cars$ = this.appSettingsFacade.vehicleBrands$.pipe(
      map((brands) => brands.map((brand) => ({ title: brand, img: 'assets/car.png' })))
    );
  }

  reviews = reviewsData;
  CarouselEnum = CarouselEnum;
}
