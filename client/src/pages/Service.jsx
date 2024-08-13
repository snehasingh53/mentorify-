import { useAuth } from "../store/auth";



export const Service = () => {
    const { services } = useAuth();

    // Static images array
    const staticImages = [
        { id: 1, src: "/image/introtoprogramming.jpg", alt: "Introduction to programming" },
        { id: 2, src: "/image/javascrpt.png", alt: "Javascript" },
        { id: 3, src: "/image/web development.png", alt: "Web development" },
        { id: 4, src: "/image/Python-Data-Science-Tutorial.jpg", alt: "Python Data Science Tutorial" },
        { id: 5, src: "/image/machinelearning.jpg", alt: "Machine Learning" },
        { id: 6, src: "/image/cybersecurity.png", alt: "Cybersecurity" }
    ];

    return (
        <section className="section-services">
            <div className="container">
                <h1 className="main-heading">Services</h1>
            </div>
            <div className="container grid grid-three-cols">
                {services.map((curElem, index) => {
                    const { title, description, instructor_id, category, duration, price } = curElem;
                    const image = staticImages[index % staticImages.length]; // Use modulo to cycle through images

                    return (
                        <div className="card" key={index}>
                            <div className="card-img">
                                <img 
                                    src={image.src} 
                                    alt={image.alt} 
                                    width="100%" 
                                    height="auto" 
                                />
                            </div>
                            <div className="card-details">
                                <p><strong>Title:</strong> {title}</p>
                                <p><strong>Description:</strong> {description}</p>
                                <p><strong>Instructor ID:</strong> {instructor_id}</p>
                                <p><strong>Category:</strong> {category}</p>
                                <p><strong>Duration:</strong> {duration}</p>
                                <p><strong>Price:</strong> {price}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
