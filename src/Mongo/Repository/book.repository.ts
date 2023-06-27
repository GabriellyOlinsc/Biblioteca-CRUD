
//liga o service com o banco de dados
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BookDTO } from "src/DTO/books.dto";
import { Book } from "../Interfaces/book.interface";

@Injectable()   //ou seja, permite que a classe seja instanciada em outra classe 
export class BookRepository{

constructor(
    @InjectModel('book') private readonly bookModel: Model<Book>
){}

   saveBook(newBook: BookDTO){
        const savedBook = new this.bookModel(newBook);
        return savedBook.save()
    }
}