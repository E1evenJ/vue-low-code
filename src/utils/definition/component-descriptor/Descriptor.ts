import { ToolType } from "@/utils/enums";
import { IAttributeDescreptor } from "../AttributeDescreptor";
import { IEventDescreptor } from "../EventDescreptor";

export interface IDescriptor {
  tools: ToolType[];
  attrDescs: IAttributeDescreptor[];
  eventDescs: IEventDescreptor[];
}
