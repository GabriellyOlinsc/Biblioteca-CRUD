import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import {BookDTO} from '../../DTO/books.dto';
import { BooksService } from 'src/Services/books/books.service';

@Controller('books')
export class BooksController {

    constructor (
        private readonly bookService: BooksService  //nova instancia da camada de serciço
    ){}

    @Get()
    getAllBooks(): string{ 
        return "Esta rota retorna todos os livros!"
    }

    @Post()
    saveBooks(@Body() newBook: BookDTO): BookDTO{
        return this.bookService.saveBook(newBook);
    }
    
    @Patch()
    updateBooks(): string{
        return "Esta rota atualiza um livro!"
    }

    @Delete()
    deleteBooks(): string {
        return "Esta rota deleta um livro!"
    }
}
