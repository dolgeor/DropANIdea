/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.isd.ideas.idea;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

/**
 *
 * @author Ilian
 */

public class IdeaMapper implements RowMapper<IdeaJson> {
    @Override
    public IdeaJson mapRow(ResultSet rs, int rowNum) throws SQLException {
       
        IdeaJson jsonObj = new IdeaJson();
       
        jsonObj.setId(rs.getLong("id"));
       
        jsonObj.setAuthor(rs.getString("author"));
       
        jsonObj.setText(rs.getString("text"));
       
        jsonObj.setDate(rs.getDate("idea_date"));
       
        jsonObj.setLikes(rs.getLong("likes"));
       
        jsonObj.setDislikes(rs.getLong("dislikes"));

       return jsonObj;
    }

     public IdeaMapper() {
     }
}