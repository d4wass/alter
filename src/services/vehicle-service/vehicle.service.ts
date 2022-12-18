import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Vehicle } from 'src/+state/models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private readonly http: HttpClient) {}

  getVehicle(id: string | null): Observable<Vehicle> {
    return this.http.get<Vehicle>(`http://localhost:3000/vehicle/${id}`);
  }

  addVehicle(userId: string, vehicle: any, token: string): Observable<{ vehicleId: string }> {
    const convertedVehicle = this.vehicleDataConverter(vehicle);

    const vehicleId = this.http.post<{ vehicleId: string }>(
      `http://localhost:3000/host/addVehicle`,
      {
        vehicle: convertedVehicle,
        userId
      },
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }
    );

    return vehicleId;
  }

  // send entire vehicle and return it after convert
  // set proper types - create vehicle model on UI
  private vehicleDataConverter(value: VehicleForm) {
    const { gearbox, drive } = value.vehicleFeaturesInfo;
    let convertedVehicle;

    convertedVehicle = {
      ...value.vehicleMainInfo,
      specification: {
        ...value.vehicleSpecInfo
      },
      features: {
        ...value.vehicleFeaturesInfo,
        drive: { ...this.stringToVehicleObjConverter(drive) },
        gearbox: { ...this.stringToVehicleObjConverter(gearbox) }
      }
    };

    return convertedVehicle;
  }

  private stringToVehicleObjConverter(value: string): {} | undefined {
    let convertedDrive;
    let convertedGearbox;

    switch (value) {
      case 'all':
        convertedDrive = { all: true, rear: false, front: false };
        break;
      case 'front':
        return (convertedDrive = { all: false, rear: false, front: true });
      case 'rear':
        return (convertedDrive = { all: false, rear: true, front: false });
      case 'manual':
        return (convertedGearbox = { manual: true, automatic: false });
      case 'automatic':
        return (convertedGearbox = { manual: false, automatic: true });
    }

    return !!convertedDrive ? convertedDrive : convertedGearbox;
  }
}

interface VehicleForm {
  vehicleMainInfo: {
    brand: string;
    model: string;
    place: string;
    price: number | null;
    description: string;
  };
  vehicleSpecInfo: {
    fuelConsumption: {
      units: string;
      quantity: string;
    };
    fuelType: string;
    doors: number;
    seats: number;
  };
  vehicleFeaturesInfo: {
    engine: {
      capacity: string;
      power: number | null;
    };
    gearbox: string;
    drive: string;
    equipment: {
      appleCarPlay: boolean;
      androidAuto: boolean;
      bluetooth: boolean;
      usb: boolean;
      headUpDisplay: boolean;
      navigation: boolean;
      airConditioning: boolean;
      keyLess: boolean;
      isofix: boolean;
      cruiseControl: {
        standard: boolean;
        active: boolean;
        adaptive: boolean;
        autonomic: boolean;
      };
      lights: {
        led: boolean;
        xenon: boolean;
        biXenon: boolean;
        laser: boolean;
      };
      parkingAssist: {
        camera: boolean;
        camera360: boolean;
        autonomic: boolean;
      };
    };
  };
}
