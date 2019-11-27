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
  post1: any;
  check:boolean=false;
  id:number;
  angForm: FormGroup;
  constructor(private services:BlogService,private fb: FormBuilder) { 
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
     
      Title:[''],
      Content: ['']
      
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
 getBlogPost(did:number)
 {
   
      this.services.getBlogPost(did).subscribe((data:{})=>{
      this.post1=data;
    })
    console.log(this.post1)
    this.check=true;
 }
 deleteBlogPostById(did:number)
 {
  
    this.services.deleteBlogPost(did).subscribe((data:{})=>
    {
      
    })

 }
 insertBlogPost()
 {
 console.log(this.angForm.value)
  this.services.saveBlogPost(this.angForm.value).subscribe(insertedUser=>{
    

    
  });
 }
 onClickSubmit()
 {
   this.insertBlogPost();
 }
 updateBlogPost()
 {
  
    
     this.services.updateBlogPost(this.id,this.angForm.value).subscribe(udatedUser=>{

     })
 }
 updateForm()
 {

    this.updateBlogPost();
 }
}