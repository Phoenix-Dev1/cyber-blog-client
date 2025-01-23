import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
        <p className="mt-4 text-lg text-gray-600">
          Empowering Minds with Insights on Cyber and Tech.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          Our Mission
        </h2>
        <p className="mt-4 text-gray-600">
          At <strong>Cyber Sphere</strong>, we aim to bridge the gap between the
          complexities of cybersecurity and technology and everyday
          understanding. Whether you're a professional in the field or a curious
          beginner, we provide the insights you need to stay ahead in the
          ever-evolving digital landscape.
        </p>
      </div>

      {/* What We Offer */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          What We Offer
        </h2>
        <ul className="list-disc list-inside mt-4 text-gray-600">
          <li>
            Engaging articles on cybersecurity, software development, web
            design, and emerging technologies.
          </li>
          <li>
            Tutorials and guides to help beginners and professionals enhance
            their skills.
          </li>
          <li>Insights into the latest tech trends, tools, and practices.</li>
          <li>
            A platform to share your stories, ideas, and expertise with a
            like-minded community.
          </li>
        </ul>
      </div>

      {/* Our Values */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          Our Values
        </h2>
        <p className="mt-4 text-gray-600">
          We are driven by the following principles:
        </p>
        <ul className="list-disc list-inside mt-4 text-gray-600">
          <li>
            <strong>Knowledge Sharing:</strong> Empowering individuals through
            accessible and actionable content.
          </li>
          <li>
            <strong>Innovation:</strong> Keeping up with and discussing
            cutting-edge advancements.
          </li>
          <li>
            <strong>Community:</strong> Building a space where tech enthusiasts
            and professionals can connect.
          </li>
          <li>
            <strong>Integrity:</strong> Ensuring content is accurate, reliable,
            and impactful.
          </li>
        </ul>
      </div>

      {/* Team Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          Meet Our Team
        </h2>
        <p className="mt-4 text-gray-600">
          Our team consists of passionate tech enthusiast, skilled developer,
          and cybersecurity expert. Together, we strive to bring you
          high-quality content and a platform to inspire innovation.
        </p>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-700">
          Join Me on This Journey
        </h2>
        <p className="mt-4 text-gray-600">
          Become part of our growing community and stay ahead in the digital
          world. Explore, learn, and share with <strong>Cyber Sphere</strong>.
        </p>
        <button className="mt-6 px-6 py-3 bg-royalblue text-white font-bold rounded-lg shadow-lg hover:bg-royalblue-dark transition duration-300">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default AboutPage;
