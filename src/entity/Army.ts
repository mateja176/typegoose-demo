import { getModelForClass, prop } from '@typegoose/typegoose';

export class ArmyDto {
  @prop({
    unique: true,
    minlength: 1,
  })
  name: string;

  @prop({
    min: 0,
    max: 100,
    validate: Number.isInteger,
  })
  squadCount: number;
}

export class Army {
  id: string;

  @prop()
  active: boolean;
}

export const ArmySerialized = Army;

export const ArmyModel = getModelForClass(Army);
