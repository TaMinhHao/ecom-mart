import React, { useEffect, useState } from 'react'
import about from '../assets/About&contact.jpg'

const Contact = () => {
    const [contact, setContact] = useState([]);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [textarea, setText] = useState('');
    let Data = [{
        name: '',
        email: '',
        message: '',
        time: ''
    }]

    useEffect(() => {
        const cont = localStorage.getItem('contactData');
        if (cont) {
            Data = JSON.parse(cont);
            setContact(Data);
        } else {
            setContact(Data);
            localStorage.setItem('contactData', JSON.stringify(Data));
        }
    }, [])

const handleSubmit =(e)=>{
    e.preventDefault();

    let date = new Date();
    let pushData={
        name: name,
        email: email,
        message: textarea,
        time: date.toLocaleString()
    }
    let cons = contact;
    cons = [...cons, pushData]
    setContact(cons);
    localStorage.setItem("contactData", JSON.stringify(contact));
    alert("Thanks!!!")
}

    return (
        <div>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-12 text-center py-4 my-4">
                        <h1>Have Some Question?</h1>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md 5 d-flex justify-content-center">
                        <img src={about} alt="Contact Us" height="300px" width="300px" />
                    </div>
                    <div className="col-md-6">
                        <form >
                            <div className="mb-3">
                                <label htmlFor="exampleForm" className="form-label">Full Name</label>
                                <input type="text"
                                    className="form-control"
                                    id="exampleForm"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="John Smith" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                                <input type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}

                                    id="exampleFormControlInput1"
                                    placeholder="name@example.com" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                                <textarea className="form-control"
                                    id="exampleFormControlTextarea1"
                                    value={textarea}
                                    onChange={e => setText(e.target.value)}
                                    rows="5"></textarea>
                            </div>
                            <button type="submit" className="btn btn-outline-primary" onClick={handleSubmit}>Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact