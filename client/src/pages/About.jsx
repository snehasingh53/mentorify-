import { useAuth } from "../store/auth"; 

export const About = () => {
  const { user } = useAuth();

  return (
    <>
      <main>
        <section className="section-home">
          <div className="container grid grid-two-cols">
            <div className="home-content">
              <p>Welcome to Mentorify </p>
              
              
              <h1>Why choose us?</h1>
              <p>
              At Mentorify, we’re more than just an educational platform—we’re your dedicated partner in learning and personal growth. Our commitment to excellence is reflected in our tailored approach to education, which combines cutting-edge technology with a personalized touch. Here’s why you should choose us:

Expert Guidance: Our team of seasoned educators and industry professionals provides top-notch mentorship and support, ensuring you receive valuable insights and practical knowledge that goes beyond the classroom.
<br/><br/> Together, we’ll unlock new opportunities and pave the way for your future success.</p>
              <div className="btn-group">
                <a href="/contact">
                  <button className="btn">Connect Now</button>
                </a>
                <a href="/services">
                  <button className="btn">Learn More</button>
                </a>
              </div>
            </div>
            <div className="home-image">
              <img src="/image/about.jpg" alt="About" width="200" height="300" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
