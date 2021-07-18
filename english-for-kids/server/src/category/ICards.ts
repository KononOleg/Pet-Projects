import { ICard } from "../cards/ICard";

export interface ICards{
  category:string
  data:ICard[]
  count?:number
}