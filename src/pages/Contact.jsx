import { useState } from 'react';
import '../css/Contact.css';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        }, 1000);
    };

    return (
        <section className="contact-section">
            <Link to="/" className="home-icon"><FiHome /></Link>
            <div className="contact-container">
                <h2 className="contact-title">Get in Touch</h2>
                <p className="contact-text">
                    Have questions or want to partner with us? Fill out the form below and we'll get back to you!
                </p>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <label>
                        Name
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Message
                        <textarea
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <button type="submit" className="contact-button">
                        {status === 'sending'
                            ? 'Sending...'
                            : status === 'success'
                                ? 'Sent!'
                                : 'Submit'}
                    </button>

                    {status === 'error' && (
                        <p className="contact-error">Oops! Something went wrong.</p>
                    )}
                </form>
            </div>
        </section>
    );
}

export default Contact;