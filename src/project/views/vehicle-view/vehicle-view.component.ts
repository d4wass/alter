import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from 'src/+state/models/vehicle.model';

@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.scss']
})
export class VehicleViewComponent implements OnInit {
  vehicle?: Vehicle;
  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.vehicle = this.route.snapshot.data['vehicle'];
    console.log(this.vehicle);
  }
}
