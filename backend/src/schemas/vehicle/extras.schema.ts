import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Extras {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  price: number;
}
