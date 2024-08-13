import { useAuth } from "../store/auth"; 

export const Home = () => {
  const { user } = useAuth();
  return (
    <>  
      <main>
        <section className="section-home">
          <div className="container grid grid-two-cols">
            <div className="home-content">
          
              <h1 className="heading">Welcome to Mentorify </h1><h1>{  user ? user.username : ''}</h1> 
              <p>
              Welcome to Mentorify , your gateway to a world of knowledge and growth. At Mentorify, we believe in empowering learners of all ages with the tools and resources they need to succeed. Our platform offers a wide range of educational content, from interactive courses and expert-led tutorials to personalized mentorship and career guidance.
              </p>
              <div className="btn-group"> 
                <a href="/contact">
                  <button className="btn">Connect Now</button>
                </a>
                <a href="/services">
                  <button className=" btn ">Learn More</button>
                </a>
              </div>
            </div>
            <div className="home-image">
              <img src="/image/home1.png" alt="remote learning" width="200" height="300" />
            </div>
          </div>
        </section>
      </main>
      
      <section className="section-analytics">
        <div className="container grid grid-four-cols">
      <div className="div1">
        <h2>
          50+
        </h2>
        <p>Registered people</p>
      </div>
      <div className="div1">
      <h2>100,00+</h2>
      <p>Happy Clients</p>
      </div>
      <div className="div1">
        <h2>500+</h2>
        <p>Well known Developers</p>
      </div>
      <div className="div1">
        <h2>24/7</h2>
        <p>Service</p>
      </div>
      
      
        </div>
       </section>
       <section className="section-below">
          <div className="container grid grid-two-cols">
          <div className="home-image2">
              <img src="/image/home2.png" alt=" study " width="200" height="300" />
            </div>
            </div>
            <div className="home-content2">
              <p>We are here to help you</p>
              <h1>Get Started Today</h1>
              <p>
              Ready to take the first step towards a more efficient and secure
              money tracker? Contact us today for a free consultation and
              let's discuss how Ensure Wealth can help you manage your money better.
              </p>
              <div className="btn-group"> 
                <a href="/contact">
                  <button className="btn">Connect Now</button>
                </a>
                <a href="/services">
                  <button className=" btn ">Learn More</button>
                </a>
              </div>
            
          </div>
        </section>
       </>
  );
}

