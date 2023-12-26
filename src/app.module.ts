import { Module } from '@nestjs/common';
import { BooksController } from './Book/books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from './Book/books.service';
import { BookRepository } from './Book/book.repository';
import { BookSchema } from './Book/Schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:cxFKdlZXJtxE9FT5@cluster0.oidkrao.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature([
      {name: 'book', schema : BookSchema}
    ])
  ],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
})
export class AppModule {}


