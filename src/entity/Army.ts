import { prop, Typegoose } from '@typegoose/typegoose';

export class ArmyDto {
  @prop()
  name: string;

  @prop()
  squadCount: number;
}

export class Army extends ArmyDto {
  id: string;

  @prop()
  active: boolean;

  static create = (rawArmy: ArmyDto): Army => {
    const army = new Army();

    Object.entries(rawArmy).forEach(([key, value]) => {
      army[key] = value;
    });

    army.active = true;

    return army;
  };
}

export class ArmyEntity extends Typegoose {}

export const ArmySerialized = Army;

export const ArmyModel = new ArmyEntity().getModelForClass(ArmyEntity);
