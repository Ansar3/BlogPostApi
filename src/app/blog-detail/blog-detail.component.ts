import { Component, OnInit } from '@angular/core';
import { BlogService } from '../Shared/blog.service';
import { BlogPost } from '../models/blogpost';
import { post } from 'selenium-webdriver/http';
import { FormGroup, FormBuilder,FormControl } from '@angular/forms';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  postList: any = [];
  check:boolean=false;
  id:number;
  angForm: FormGroup;
  constructor(private services:BlogService,private fb: FormBuilder) { 
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      id: [''],
      content: [''],
      title:['']
    });
  }

  ngOnInit() {
    this.postList=this.getAllPost();
   
  
  }
  getAllPost() {
    this.postList = [];
      this.services.getBlogPosts().subscribe((data: {}) => {
        this.postList=data;
     
  })
}
 getBlogPost()
 {
   this.postList;
   this.id=1;
    this.services.getBlogPost(this.id).subscribe((data:{})=>
    {
      this.postList=data;
    })
    this.check=true;
 }
 deleteBlogPostById()
 {
  this.id=1;
    this.services.deleteBlogPost(2).subscribe((data:{})=>
    {
      
    })
    
 }
 insertBlogPost()
 {
  this.services.saveBlogPost(this.angForm.value).subscribe(insertedUser=>{

    
  });
 }
 onClickSubmit()
 {
   this.insertBlogPost();
 }
}