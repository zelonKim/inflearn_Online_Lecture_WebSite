import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';

@Injectable()
export class PostRepository {
  private posts: Post[] = [];
  private idCounter = 1;

  find(): Post[] {
    return this.posts;
  }

  findOne({ where: { id } }: { where: { id: number } }): Post | null {
    return this.posts.find((post) => post.id === id) || null;
  }

  create(model): Post {
    const newPost: Post = { id: this.idCounter++, ...model };
    this.posts.push(newPost);
    return newPost;
  }

  save(post: Post): Post {
    const index = this.posts.findIndex((p) => p.id === post.id);
    if (index !== -1) {
      this.posts[index] = post;
    } else {
      this.posts.push(post);
    }
    return post;
  }

  update(id: number, model): void {
    const index = this.posts.findIndex((post) => post.id === id);
    if (index !== -1) {
      this.posts[index] = { ...this.posts[index], ...model };
    }
  }

  delete(id: number): void {
    this.posts = this.posts.filter((post) => post.id !== id);
  }
}
