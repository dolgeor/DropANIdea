/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.isd.ideas.idea;

import java.sql.Date;

/**
 *
 * @author Ilian
 */
 public class IdeaJson {

        private Long id;
        private String text;
        private String author;
        private Date date;
        private Long likes;
        private Long dislikes;

        public IdeaJson() {
        }
        
        public IdeaJson(long id, String text, String author, Date date, Long likes, Long dislikes) {
            
            this.id = id;
            
            this.text = text;
            
            this.author = author;
            
            this.date = date;
            
            this.likes = likes;
            
            this.dislikes = dislikes;
        }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getLikes() {
        return likes;
    }

    public void setLikes(Long likes) {
        this.likes = likes;
    }

    public Long getDislikes() {
        return dislikes;
    }

    public void setDislikes(Long dislikes) {
        this.dislikes = dislikes;
    }

      
 }
