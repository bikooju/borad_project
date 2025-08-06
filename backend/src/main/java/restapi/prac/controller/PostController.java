package restapi.prac.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import restapi.prac.entity.Post;
import restapi.prac.service.PostService;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    //게시글 목록 조회 (페이지네이션 적용: 기본 페이지 번호 = 0, 페이지 사이즈 = 10)
    @GetMapping
    public ResponseEntity<Page<Post>> listsPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Post> posts = postService.getPosts(pageable);
        return ResponseEntity.ok(posts);
    }

    // 게시글 단건 조회
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPost(@PathVariable Long id) {
        Optional<Post> postOpt = postService.getPost(id);
        return postOpt.map(ResponseEntity::ok) //200 ok
                .orElseGet(() -> ResponseEntity.notFound().build()); //404 Not Found
    }

    //게시글 생성
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        Post createdPost = postService.createPost(post);
        return ResponseEntity.ok(createdPost);
    }

    //게시글 수정
    @PutMapping("/{id}")
    public ResponseEntity<Post> updatedPost(@PathVariable Long id, @RequestBody Post updatedPost) {
        Optional<Post> updated = postService.updatePost(id, updatedPost);
        return updated.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //게시글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        boolean deleted = postService.deletePost(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
