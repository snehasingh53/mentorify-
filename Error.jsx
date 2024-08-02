import { NavLink } from "react-router-dom"

export const Error =()=>{
    return (<>
    <section id ="error-page">
        < div className="content">
            <h1>Sorry! page not found</h1>
             <p>Oops! It seems like the page you're tryibg to access doesn't exist.
                If you believe there's an issue , feel free to report it, and we'll look into it.

             </p>
    
        <div className="btns">
            <NavLink to ="/">return home</NavLink>
            <NavLink to ="/contact">contact</NavLink>
        </div>
            </div>
        </section></>
        );
}