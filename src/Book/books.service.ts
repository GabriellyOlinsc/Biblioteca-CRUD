import { BadRequestException, Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { Book } from './Schemas/book.schema';
import { BookDTO } from './DTO/books.dto';
@Injectable()
export class BooksService {
  constructor(private readonly bookRepository: BookRepository) {}

  async getAllBooks(): Promise<Book[]> {
    const allBooks = await this.bookRepository.getAllBooks();
    if (!allBooks.length) throw new BadRequestException('No book register');
    return allBooks;
  }

  async getBookById(bookID: string): Promise<Book> {
    const existBook = this.bookRepository.getBookById(bookID);
    if (!existBook) throw new BadRequestException('There are no results');
    return existBook;
  }

  async getBookByAuthorName(authorName: string): Promise<Book[]> {
    const splitedAuthorName = authorName.split(' ');
    const foundBooks = await this.bookRepository.getBookByAuthorName(
      splitedAuthorName,
    );
    if (!foundBooks.length)
      throw new BadRequestException('No results for this author');
    return foundBooks;
  }

  async getBookByTitle(title: string): Promise<Book[]> {
    const splitedTitle = title.split(' ');
    const foundBooks = await this.bookRepository.getBookByTitle(splitedTitle);
    if (!foundBooks.length)
      throw new BadRequestException('No results for this title');
    return foundBooks;
  }

  async saveBook(newBook: BookDTO): Promise<Book> {
    return await this.bookRepository.saveBook(newBook);
  }

  async updateBookById(bookID: string, newBook: BookDTO): Promise<Book> {
    this.getBookById(bookID);
    const updatedBook = this.bookRepository.updateBookById(bookID, newBook);
    if (updatedBook) return this.bookRepository.getBookById(bookID);
    else throw new BadRequestException('Error in update');
  }

  async deleteBookByID(bookID: string): Promise<Book> {
    try {
      return await this.bookRepository.deleteBookByID(bookID);
    } catch (e) {
      throw new BadRequestException('This book does not exists');
    }
  }
}
