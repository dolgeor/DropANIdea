package com.isd.ideas.idea;

import java.sql.Date;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface IdeaRepo extends CrudRepository<Idea, Long>{
	Idea findByid(long id);  
        List<Idea> findByauthor(String author);
        List<Idea> findBydate(Date date);
}
