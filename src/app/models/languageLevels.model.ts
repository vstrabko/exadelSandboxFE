import { ResourceModel } from './resource.model';

export class languageLevel extends ResourceModel<languageLevel> {
  public id: number;
  public name: string;

  constructor(model?: Partial<languageLevel>) {
    super(model);
  }
}
