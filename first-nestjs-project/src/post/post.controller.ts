import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts') // http://localhost:3000/posts
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id') // http://localhost:3000/post/[id]
  findOne(@Param('id', ParseIntPipe) id: number) { // ParseIntPipe -> 문자열로 들어온 id값을 정수형으로 변환해줌.
    return this.postService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) createPostDto: CreatePostDto) { // ValidationPipe -> DTO에 정의된 유효성 검사를 수행함.
    return this.postService.create(createPostDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postService.remove(id);
  }
}
