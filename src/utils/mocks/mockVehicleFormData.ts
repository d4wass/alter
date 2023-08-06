export function mockVehicleFormData(
  vehicle = {
    vehicleFeaturesInfo: {
      drive: '',
      engine: {
        capacity: '',
        power: null
      },
      equipment: [],
      gearbox: ''
    },
    vehicleMainInfo: {
      brand: '',
      description: '',
      model: '',
      place: '',
      price: null
    },
    vehicleSpecInfo: {
      doors: 0,
      fuelConsumption: {
        quantity: '',
        units: ''
      },
      fuelType: '',
      seats: 0
    }
  }
): any {
  return vehicle;
}
