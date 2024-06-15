import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { VehicleService } from './vehicle.service';

describe('VehicleService', () => {
  let service: VehicleService;
  let spectatorService: SpectatorHttp<VehicleService>;
  const apiURL = 'http://localhost:3000';

  const createService = createHttpFactory(VehicleService);

  beforeEach(() => {
    spectatorService = createService();
    service = spectatorService.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('GET', () => {
    it('should get vehicle', (done) => {
      const mockVehicle = { id: '1', name: 'Car 1' };
      const id = '1';

      service.getVehicle(id).subscribe((vehicle) => {
        expect(vehicle).toEqual(mockVehicle);
        done();
      });
      const req = spectatorService.expectOne(`${apiURL}/vehicle/${id}`, HttpMethod.GET);

      req.flush(mockVehicle);
    });

    it('should get vehicle brands', (done) => {
      const mockBrands = ['Car 1', 'Car 2'];

      service.getVehicleBrands().subscribe((brands) => {
        expect(brands).toEqual(mockBrands);
        done();
      });
      const req = spectatorService.expectOne(`${apiURL}/vehicles/brands`, HttpMethod.GET);

      req.flush(mockBrands);
    });
  });

  describe('POST', () => {
    it('should add vehicle', (done) => {
      const mockVehicle = {
        id: '1',
        name: 'Car 1',
        vehicleFeaturesInfo: { drive: 'FWD', gearbox: 'Manual' }
      };
      const userId = '1';

      service.addVehicle(userId, mockVehicle, 'token').subscribe((vehicleId) => {
        expect(vehicleId).toEqual(mockVehicle.id);
        done();
      });

      const req = spectatorService.expectOne(`${apiURL}/host/addVehicle`, HttpMethod.POST);
      req.flush(mockVehicle.id);
    });
  });

  describe('DELETE', () => {
    it('should remove vehicle', () => {
      const vehicleId = '1';
      const userId = '1';

      service.removeVehicle(vehicleId, userId, 'token').subscribe();
      spectatorService.expectOne(`${apiURL}/host/removeVehicle`, HttpMethod.DELETE);
    });
  });
});
