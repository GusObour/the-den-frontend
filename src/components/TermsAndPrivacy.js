import React from 'react';

const TermsAndPrivacy = () => {
  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-4 text-light-blue">Terms of Service and Privacy Policy</h1>
      <p>Effective Date: June 2023</p>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-blue">1. Introduction</h2>
        <p>Welcome to The Den! By using our barbershop booking application, you agree to comply with and be bound by the following Terms of Service and Privacy Policy. Please read them carefully before using the service.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-blue">2. User Responsibilities</h2>
        <p>Users are responsible for maintaining the confidentiality of their account information, including their password. Users agree to provide accurate and complete information when creating an account and booking appointments.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-blue">3. Booking and Cancellation Policy</h2>
        <p>Appointments can be booked through our application, subject to availability. Users must cancel or reschedule appointments at least 24 hours in advance to avoid cancellation fees. The Den reserves the right to charge a fee for late cancellations or no-shows.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-blue">4. Information We Collect</h2>
        <p>We collect information from you when you create an account, book an appointment, or communicate with us. This may include:</p>
        <ul className="list-disc list-inside ml-5">
          <li>Personal Identification Information: Name, email address, phone number, etc.</li>
          <li>Appointment Details: Date, time, and services requested.</li>
          <li>Payment Information: Credit card details or other payment methods.</li>
          <li>Technical Data: IP address, browser type, and other technical data.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-blue">5. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc list-inside ml-5">
          <li>Provide and manage our services.</li>
          <li>Process your transactions.</li>
          <li>Send appointment confirmations and reminders.</li>
          <li>Communicate with you about your account or our services.</li>
          <li>Improve our services and customer experience.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-blue">6. How We Share Your Information</h2>
        <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
        <ul className="list-disc list-inside ml-5">
          <li>Service providers who assist in providing our services (e.g., payment processors).</li>
          <li>Compliance with legal obligations or to protect our rights and safety.</li>
          <li>In the event of a merger, acquisition, or sale of all or a portion of our assets.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-blue">7. Data Security</h2>
        <p>We use industry-standard security measures to protect your data. However, no data transmission over the internet or electronic storage method is 100% secure, and we cannot guarantee its absolute security.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-blue">8. Your Rights</h2>
        <p>You have the right to access, update, or delete your personal information. You can do so by logging into your account or contacting us directly.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-blue">9. Limitation of Liability</h2>
        <p>The Den is not liable for any damages arising from the use of our service. We strive to provide a reliable booking system, but we do not guarantee the availability of appointments at all times.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-blue">10. Changes to This Document</h2>
        <p>We may update these terms and the Privacy Policy from time to time. Users will be notified of any changes via email or through our application. Continued use of the service after changes are posted constitutes acceptance of the new terms and policy.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-blue">11. Contact Information</h2>
        <p>If you have any questions about these Terms of Service or the Privacy Policy, please contact us at support@thedenbarbershop.com.</p>
      </section>

      <div className="mt-8">
        <p>By using The Den's services, you agree to these Terms of Service and Privacy Policy.</p>
      </div>
    </div>
  );
};

export default TermsAndPrivacy;
