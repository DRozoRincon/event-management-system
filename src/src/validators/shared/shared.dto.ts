import { IsNumberString } from "class-validator";

export class IdentifierDto {
  @IsNumberString()
  id: string;
}
