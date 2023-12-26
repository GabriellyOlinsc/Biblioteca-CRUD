import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BookDTO } from "./DTO/books.dto";
import { Book } from "./Schemas/book.schema";

@Injectable()  
export class BookRepository{

constructor(
    @InjectModel('book') private readonly bookModel: Model<Book>
){}

async getAllBooks(): Promise<Book[]>{
    return await this.bookModel.find({},{__v: false}).sort({name: +1}).exec()
}

async getBookByAuthorName(authorName: string[]): Promise<Book[]>{
    return await this.bookModel.find({
        $or: [
            {'author.name': { $in: authorName}},
            {'author.surname': {$in: authorName}}
        ]
    })
} 
async getBookByTitle(title: string[]): Promise<Book[]>{
    return await this.bookModel.find({
       name: {'$regex': title, '$options': 'i' }
    },
    {__v: false})
} 

async getBookById(bookID : string): Promise<Book>{
    return await this.bookModel.findById(bookID, {__v : false})
}
async saveBook(newBook: BookDTO): Promise <Book>{
    const savedBook =  new this.bookModel(newBook);
    return await savedBook.save();
}

async updateBookById(bookID: string,  newBook: BookDTO): Promise<Book>{
    return await this.bookModel.findOneAndReplace({ _id :bookID}, newBook)
}

async deleteBookByID(bookID: string): Promise<Book>{
    return await this.bookModel.findOneAndDelete({ _id :bookID})
}

}

