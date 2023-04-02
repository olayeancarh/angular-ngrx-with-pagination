import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PostsService } from './posts.service';
import { Posts } from '../models';
import { postsData } from '../spec-helpers/posts-data.spec-helper';
import { environment } from 'src/environments/environment';

const expectedUrl = `${environment.baseApiUrl}/posts`;

describe('PostsService', () => {
  let postService: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService],
    });
    postService = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(postService).toBeTruthy();
  });

  it('should get posts', () => {
    let allPost: Posts[] | undefined;
    postService.getPosts().subscribe((posts) => (allPost = posts));

    const request = httpMock.expectOne({
      method: 'GET',
      url: expectedUrl,
    });
    request.flush(postsData);
    httpMock.verify();

    expect(allPost).toEqual(postsData);
  });
});
