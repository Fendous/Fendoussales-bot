import React from "react";

const GDPR = () => {
  return (
    <div className="md:mx-12 mt-24 p-6 text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-white">GDPR Compliance</h1>

      <p className="mb-4">
        We follow strict GDPR and DDPA Regulations. Any data you share is very
        confidential, and we do not share it with any of our partners without
        your consent. Therefore, be reassured of the confidentiality of your
        data.
      </p>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-white">
          About the Regulation
        </h2>
        <p>
          The Data Protection Regulation replaces Directive 95/46 / EC (the Data
          Protection Directive), which has been implemented in Danish law by the
          Personal Data Act, cf. Act no. 429 of 31 May 2000 on the processing of
          personal data, as last amended by Act no. 410 of 27 April 2017.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-white">
          Data Submission and Confidentiality
        </h2>
        <p>
          By submitting your data on our website, you agree to the terms and
          conditions of Fendous AI involving business-related activities. Kindly
          refer to the terms and conditions of Fendous AI before you share any
          data with us. Fendous stands for strict confidentiality of your data,
          and we handle your data with care and confidentiality. While we
          process your information, you have all rights towards Fendous or the
          person handling your data in Fendous.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-white">
          Data Processing and Partners
        </h2>
        <p>
          Fendous will process the data in accordance with the partners,
          clients, or customers, and Fendous is responsible for handling your
          data. Our privacy policy is all about the security of your data and
          compliance according to the EU, USA, and Denmark data protection acts.
          Customer, client, supplier, employee, or consultant data is required
          and is processed so that we can collaborate and communicate with them
          on various contracts and agreements. We process general personal
          information such as name, position, contact information, including the
          name of the company, address, email, and telephone number, username.
          We also analyze customer service data and information related to
          solving tasks and working on projects, including meeting notes.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-white">
          Data Storage and Cookies
        </h2>
        <p>
          We store personal data and data related to documents, contracts, and
          agreements made verbally and in written minutes of meetings. We have
          partners who provide us with various IT tools, and they are
          established outside the EU/EEA. However, we assess the company or
          partner's compliance based on local regulations and data protection
          acts. We also use cookies; please read our cookie policy before
          acknowledging cookies. You have the right to view, edit, and delete
          your information with us.
        </p>
      </div>

      <div className="mt-8">
        <p className="text-gray-300">
          <strong>
            Copyright © 2024 All rights reserved - Fendous Sustainable Solutions
          </strong>
        </p>
        <p className="mt-2">
          For any inquiries, please contact us at{" "}
          <a
            href="mailto:support@fendousai.com"
            className="text-blue-400 underline"
          >
            support@fendousai.com
          </a>{" "}
          or call us at +45 29811860.
        </p>
      </div>
    </div>
  );
};

export default GDPR;
