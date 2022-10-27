import { Prop, SchemaFactory, Schema, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FeatureDocument = Feature & Document;

@Schema()
export class Feature {
  @Prop({ type: raw({ capacity: { type: String }, power: { type: Number } }) })
  engine: Record<string, any>;
  @Prop({ type: raw({ manual: { type: Boolean }, powautomaticer: { type: Boolean } }) })
  gearbox: Record<string, any>;
  @Prop({
    type: raw({ rear: { type: Boolean }, front: { type: Boolean }, all: { type: Boolean } })
  })
  drive: Record<string, any>;
  @Prop({
    type: raw({
      appleCarPlay: { type: Boolean },
      androidAuto: { type: Boolean },
      bluetooth: { type: Boolean },
      usb: { type: Boolean },
      headUpDisplay: { type: Boolean },
      navigation: { type: Boolean },
      airConditioning: { type: Boolean },
      keyLess: { type: Boolean },
      cruiseControl: {
        standard: { type: Boolean },
        active: { type: Boolean },
        adaptive: { type: Boolean }
      },
      lights: {
        led: { type: Boolean },
        xenon: { type: Boolean },
        biXenon: { type: Boolean },
        laser: { type: Boolean }
      },
      parkingAssist: {
        camera: { type: Boolean },
        camera360: { type: Boolean },
        autonomic: { type: Boolean }
      },
      isofix: { type: Boolean }
    })
  })
  equipment: Record<string, any>;
}

export const FeatureSchema = SchemaFactory.createForClass(Feature);

interface EngineInfo {
  capacity: string;
  power: number;
}
