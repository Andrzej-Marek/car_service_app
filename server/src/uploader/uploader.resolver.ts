import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
@UseGuards(AuthGuard)
export class UploaderResolver {
  constructor(private uploaderService: UploaderService) {}

  @Mutation(() => String)
  async uploadSingleImage(
    @Args({ name: 'image', type: () => GraphQLUpload }) image: FileUpload,
  ): Promise<string> {
    return this.uploaderService.uploadSingleImage(image);
  }

  @Mutation(() => Boolean)
  async removeSingleImage(
    @Args('imageUrl') imageUrl: string,
  ): Promise<boolean> {
    return this.uploaderService.removeSingleImage(imageUrl);
  }
}
