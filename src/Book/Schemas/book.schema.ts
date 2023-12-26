import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Book extends Document {
    @Prop({type: String, required: true})
    name: string

    @Prop({type: String, required: true})
    author: string

    @Prop({type: String, required: true})
    language: string

    @Prop({type: Number, required: true})
    releaseYear: number

    @Prop({type: String, required: true})
    publisher: String

    @Prop({type: Number, required: true})
    pages: Number
}

export const BookSchema = SchemaFactory.createForClass(Book)