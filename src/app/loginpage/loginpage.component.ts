import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CmproxyService } from '../services/cmproxy.service';
import { CarouselComponent, Slide } from './carousel/carousel.component';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css',
})
export class LoginpageComponent {
  constructor(private router: Router, private proxy$: CmproxyService) {}

  @ViewChild(CarouselComponent, { static: true }) carousel!: CarouselComponent;

  slides: Slide[] = [
    {
      img: 'image1.jpg',
      header: 'Start Planning Your Next Adventure Today!',
      text: 'The world is waiting for you and Campus Meetups is here to help you get there! Log in now with your campus email to create your first trip, meet fellow students, and get started on your next adventure.',
    },
    {
      img: 'image2.jpeg',
      header: 'Explore New Destinations!',
      text: "Join groups traveling to exciting destinations, whether you're looking for adventure or relaxation. Your next trip is just a click away.",
    },
    {
      img: 'image3.jpg',
      header: 'Meet New People Along the Way!',
      text: 'Connect with like-minded students, share experiences, and make lifelong friendships as you travel and explore new places.',
    },
    {
      img: 'image4.jpg',
      header: 'Meet New People Along the Way!',
      text: 'Connect with like-minded students, share experiences, and make lifelong friendships as you travel and explore new places.',
    },
  ];

  onLoginButtonClick(): void {
    this.proxy$.login().subscribe(() => {});
  }
}
