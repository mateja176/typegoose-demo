import { getModelForClass, prop } from '@typegoose/typegoose';

export class ArmyDto {
  @prop()
  name: string;

  @prop()
  squadCount: number;
}

export class ArmyStruct extends ArmyDto {
  @prop()
  active: boolean;
}

export class Army extends ArmyStruct {
  id: string;
}

export const ArmySerialized = Army;

export const ArmyModel = getModelForClass(Army);
