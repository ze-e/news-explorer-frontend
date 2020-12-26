import React from 'react';

export default function About() {
  return (
    <section className="about">
      <img className="about__img" src="../../images/about_img.png" alt="profile-picture"></img>
      <div className="about__text">
        <h2 className="about__title">About the author</h2>
        <p className="about__description">
          This block describes the project author. 
          Here you should indicate your name, what you do, and which 
          development technologies you know.

          You can also talk about your experience with Practicum, what you learned there, 
          and how you can help potential customers.
        </p>
      </div>
    </section>
  );
}