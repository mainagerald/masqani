import React from 'react';
import { FiHome } from 'react-icons/fi';
import { LuBuilding, LuCreditCard, LuHouse, LuUsers } from 'react-icons/lu';
import { Link } from 'react-router-dom';


const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300">
    <div className="text-primary-600 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-primary-900">{title}</h3>
    <p className="text-primary-700">{description}</p>
  </div>
);

const Home = () => {
  const features = [
    {
      icon: <LuHouse size={48} />,
      title: 'Property Management',
      description: 'Seamlessly manage your residential and commercial properties with our intuitive platform.'
    },
    {
      icon: <LuBuilding size={48} />,
      title: 'Monthly Rentals',
      description: 'Simplified monthly rental tracking, from listing to payment collection.'
    },
    {
      icon: <LuUsers size={48} />,
      title: 'Tenant & Landlord Portal',
      description: 'Connected experiences for both tenants and property owners.'
    },
    {
      icon: <LuCreditCard size={48} />,
      title: 'Integrated Payments',
      description: 'Secure, hassle-free rent collection and financial management.'
    }
  ];

  return (
    <div className="min-h-screen bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
            Revolutionize Your Real Estate Management
          </h1>
          <p className="text-xl text-primary-700 max-w-3xl mx-auto mb-8">
            masQani provides a comprehensive solution for property managers, 
            landlords, and tenants to streamline rental processes and property management.
          </p>
          <div className="flex justify-center space-x-4 mb-12">
            <Link
              to="/properties"
              className="bg-primary-600 text-white px-6 py-3 rounded-xl 
              hover:bg-primary-700 transition-colors duration-300"
            >
              View Properties
            </Link>
            <Link
              to="/register"
              className="bg-secondary-500 text-white px-6 py-3 rounded-xl 
              hover:bg-secondary-600 transition-colors duration-300"
            >
              Get Started
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-primary-900 mb-12">
            How masQani Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-soft mb-4">
                <span className="text-4xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">List Your Property</h3>
              <p className="text-primary-700">
                Easily add your properties with detailed information and attractive listings.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-soft mb-4">
                <span className="text-4xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">Find Tenants</h3>
              <p className="text-primary-700">
                Connect with verified tenants through our comprehensive matching system.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-soft mb-4">
                <span className="text-4xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">Manage Seamlessly</h3>
              <p className="text-primary-700">
                Track payments, maintenance, and communications in one platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transform Your Real Estate Management Today
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of property managers and landlords who have simplified their 
            workflow with masQani's comprehensive solution.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="bg-white text-secondary-600 px-8 py-3 rounded-xl 
              hover:bg-primary-50 transition-colors duration-300 font-semibold"
            >
              Start Free Trial
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-xl 
              hover:bg-white hover:text-secondary-500 transition-colors duration-300 font-semibold"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-primary-900 mb-12">
            Features of Masqani
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<LuHouse size={48} />}
              title="User-Friendly Interface"
              description="Navigate effortlessly through our intuitive design."
            />
            <FeatureCard 
              icon={<LuBuilding size={48} />}
              title="Comprehensive Analytics"
              description="Gain insights into your properties' performance."
            />
            <FeatureCard 
              icon={<LuUsers size={48} />}
              title="24/7 Support"
              description="Our team is here to assist you anytime."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
