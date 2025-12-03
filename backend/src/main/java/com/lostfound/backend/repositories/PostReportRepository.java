package com.lostfound.backend.repositories;

import com.lostfound.backend.model.Post;
import com.lostfound.backend.model.PostReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostReportRepository extends JpaRepository<PostReport, Integer> {
    void deleteAllByPost(Post post);

}
