import { ICards } from "../category/ICards";
import { repository } from "../database";
import { ICard } from "./ICard";

export async function getCards(category:string): Promise<ICard[]> {
  const cat = await repository.findOne({category:`${category}`});
  const cards = await cat.data.map((card:ICard)=>({word:card.word,translation:card.translation,image:card.image,audio:card.audio}))  ;
  return Promise.resolve<ICard[]>(cards);
}


export async function getPageCards(category:string,page:number,limit:number):Promise<ICard[]> {

  const cat = await repository.findOne({category:`${category}`});
  const cards = await cat.data.map((card:ICard)=>({word:card.word,translation:card.translation,image:card.image,audio:card.audio}));
  const INDEX=1;
  const pageCards = cards.slice((page- INDEX) * limit, page * limit)
  return Promise.resolve(pageCards);
}


export async function updateCard(category:string,card:string,body:any): Promise<ICard[]> {
  const cards = await repository.updateOne( {category: category,"data.word": card},
    {$set:{"data.$.word":body.word,"data.$.translation":body.translation,"data.$.audio":body.audio,"data.$.image":body.image}});
  return Promise.resolve<ICard[]>(cards);
}

export async function deleteCard(category:string, card:string):Promise<void> {
  await repository.updateOne({category: category}, {$pull: { data:{word: card}}}); 
  return Promise.resolve();
}



export async function createCard(category:string,body:ICard):Promise<ICards[]>{
  const newCategory = await repository.updateOne({category:category},  {$push:{ data:{word:body.word,translation:body.translation,audio:body.audio,image:body.image}}});
   return Promise.resolve<ICards[]>(newCategory);
 }


 export async function getAllCards():Promise<ICards[]>{
  const AllCategory= await repository.find({}) 
  const allCards = await AllCategory.map((category:ICards)=>({category:category.category, 
     data:category.data.map((card:ICard)=>({word:card.word,translation:card.translation,audio:card.audio,image:card.image}))}));
   return Promise.resolve(allCards);
 }
