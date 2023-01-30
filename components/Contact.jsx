import React, { useRef } from 'react';
import styles from '../styles/ContactForm.module.css';
import emailjs from '@emailjs/browser';

function Contact() {
  const form = useRef();

  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_i3rs6cc',
        'template_oonxz7s',
        form.current,
        'o2jP32BE4AwKYKPs8'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }

  return (
    <section>
      <div className={styles.containerForm}>
        <h2 className={styles.tac}>Contact Us</h2>
        <form
          ref={form}
          onSubmit={sendEmail}
          className={[styles.formControl, styles.card].join(' ')}
        >
          <div className="inputs">
            <div className="namemail">
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
              />
              <input
                type="email"
                name="user_email"
                placeholder="Email"
                required
              />
            </div>
            <input type="text" name="subject" placeholder="Subject" required />
          </div>
          <textarea
            name="message"
            cols="30"
            rows="10"
            placeholder="Write your message here"
          ></textarea>
          <button
            className={[styles.btn, styles.btn_primary].join(' ')}
            type="submit"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
