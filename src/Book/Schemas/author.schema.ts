import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Author extends Document{ 
    @Prop({type: String, required: true})
    name: string

    @Prop({type: String, required: true})
    surname: string
}

export const AuthorSchema = SchemaFactory.createForClass(Author)
