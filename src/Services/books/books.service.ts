import { BadRequestException, Injectable } from '@nestjs/common';
import { BookDTO } from 'src/DTO/books.dto';
import { Book } from 'src/Mongo/Interfaces/book.interface';
import { BookRepository } from 'src/Mongo/Repository/book.repository';

@Injectable()
export class BooksService {

constructor(
    private readonly bookRepository: BookRepository
){}

async getAllBooks():Promise<Book[]>{
    const allBooks =  await this.bookRepository.getAllBooks()
    //vindo do controller, a função getAllBooks deve estar cadastrada no repositório
    if(!allBooks.length)
        throw new  BadRequestException("No book register")
    return allBooks;
}

async getBookById(bookID: string): Promise<Book>{
    try {
        const existBook =  this.bookRepository.getBookById(bookID);
        if(!existBook)
            throw new BadRequestException('There are no results')
        return existBook
        
    }catch (e) {
        throw new BadRequestException('There are no results')
    }
}

async getBookByAuthorName(authorName: string): Promise<Book[]>{
    const splitedAuthorName = authorName.split(' ')
    const foundBooks = await this.bookRepository.getBookByAuthorName(splitedAuthorName)
    if (!foundBooks.length)
        throw new BadRequestException('No results for this author')
    return foundBooks
} 

async getBookByTitle(title:string): Promise <Book[]>{
    const splitedTitle = title.split(' ')
    const foundBooks = await this.bookRepository.getBookByTitle(splitedTitle)
    if (!foundBooks.length)
        throw new BadRequestException('No results for this title')
    return foundBooks
}

async saveBook(newBook: BookDTO): Promise <Book>{
    return await this.bookRepository.saveBook(newBook)
}

async updateBookById(bookID: string, newBook: BookDTO): Promise <Book>{
    const existBook =  this.bookRepository.getBookById(bookID);
    if(!existBook)
        throw new BadRequestException('There are no results with this ID')
    const updatedBook = this.bookRepository.updateBookById(bookID, newBook)
    if(updatedBook)
        return this.bookRepository.getBookById(bookID);
    else
        throw new BadRequestException('Error in update')
}

async deleteBookByID(bookID: string): Promise<Book>{
    try{
        return await this.bookRepository.deleteBookByID(bookID)
    }catch(e){
        throw new BadRequestException('This book does not exists');
    }

}
}
