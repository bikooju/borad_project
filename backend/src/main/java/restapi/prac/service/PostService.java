package restapi.prac.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import restapi.prac.entity.Post;
import restapi.prac.repository.PostRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    // 전체 게시글 조회 (페이지 처리)
    public Page<Post> getPosts(Pageable pageable) {
        return postRepository.findAll(pageable);
    }

    // 단일 게시글 조회
    public Optional<Post> getPost(Long id) {
        return postRepository.findById(id);
    }

    // 게시글 생성
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    // 게시글 수정
    public Optional<Post> updatePost(Long id, Post updatedPost) {
        return postRepository.findById(id).map(post -> {
            post.setTitle(updatedPost.getTitle());
            post.setContent(updatedPost.getContent());
            return postRepository.save(post);
        });
    }

    //게시글 삭제
    public boolean deletePost(Long id) {
        return postRepository.findById(id).map(post -> {
            postRepository.delete(post);
            return true;
        }).orElse(false);
    }


}
