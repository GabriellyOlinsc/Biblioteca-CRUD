import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {BookDTO} from './DTO/books.dto';
import { BooksService } from './books.service';
import { Book } from './Schemas/book.schema';

@Controller('books')
export class BooksController {

    constructor (
        private readonly bookService: BooksService
    ){}

    @Get()
    async getAllBooks():Promise<Book[]>{ 
        return await this.bookService.getAllBooks();
    }

    @Get('author/:authorName')
    async getBookByAuthorName(@Param('authorName') authorName : string): Promise<Book[]>{
        return await this.bookService.getBookByAuthorName(authorName)
    }

    @Get('title/:title')
    async getBookByTitle(@Param('title') title : string): Promise<Book[]>{
        return await this.bookService.getBookByTitle(title)
    }

    @Get('id/:bookID')
    async getBookById(@Param('bookID') bookID: string): Promise <Book> {
        return await this.bookService.getBookById(bookID);
    } 

    @Post()
    async saveBooks(@Body() newBook: BookDTO): Promise<Book>{ 
        return await this.bookService.saveBook(newBook);
    }
    
    @Patch(':bookID')
    async updateBookById(@Param('bookID') bookID: string, @Body() newBook : BookDTO): Promise<Book>{
        return await this.bookService.updateBookById(bookID, newBook)
    }

    @Delete(':bookID')
    async deleteBookByID(@Param('bookID') bookID : string) : Promise<Book> {
        return await this.bookService.deleteBookByID(bookID);
    }
}
