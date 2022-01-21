import { ToolType } from "@/utils/enums";
import { AttributeDescreptor } from "../AttributeDescreptor";
import { EventDescreptor } from "../EventDescreptor";

export interface Descriptor {
  tools: ToolType[];
  attrDescs: AttributeDescreptor[];
  eventDescs: EventDescreptor[];
}
