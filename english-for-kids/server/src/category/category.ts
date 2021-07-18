
import { repository } from '../database';
import { ICards } from './ICards';



export async function getCategories(): Promise<void> {
  const allCategories = await repository.find();
  const categories= await allCategories.map((category:ICards)=>({category:category.category, count:category.data.length}))
  return Promise.resolve();
} 



export async function updateCategory(category:string, newCategory:string): Promise<void> {
  await repository.updateOne({category:`${category}`},{$set:{category:`${newCategory}`}}, {upsert: false})
  return Promise.resolve();
}


export async function deleteCategory(category:string) : Promise<void> {
  await repository.deleteOne({category:`${category}`})
  return Promise.resolve();
 }


 export async function createCategory(category:string):Promise<void>{
     await repository.create({category:category,data:[]}) 
    return Promise.resolve();
 }

 export async function getPageCategories(page:number,limit:number) :Promise<{category:string,count:number}>{
  const cat = await repository.find();
  const categories = await cat.map((category:ICards)=>({category:category.category,count:category.data.length}));
  const INDEX=1;
  const pageCategories = categories.slice((page- INDEX) * limit, page * limit)
  return Promise.resolve(pageCategories);
}

