import Layout from "../Layout/Layout";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <Layout>
      <div className="form-container container mt-5 ">
        <form action="">
          <div>
            <span>Please fill this form</span>
          </div>
          <div>
            <label htmlFor="client-name">Name</label>
            <input type="text" name="client-name" id="client-name" />
          </div>
          <div>
            <label htmlFor="client-email">Email</label>
            <input type="email" name="client-email" id="client-email" />
          </div>
          <div>
            <label htmlFor="client-name">Phone</label>
            <input type="text" name="client-phone" id="client-phone" />
          </div>
          <div>
            <input type="submit" value="submit" id="client-form-submit" />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ContactUs;
