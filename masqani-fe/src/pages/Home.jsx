import React from 'react';
import { FiHome } from 'react-icons/fi';
import { LuBuilding, LuCreditCard, LuHouse, LuUsers } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-neutral-100 p-6 rounded-xl transition-all duration-300">
    <div className="text-black mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
    <p className="text-neutral-800">{description}</p>
  </div>
);

const Home = () => {
  const features = [
    {
      icon: <LuHouse size={48}/>,
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
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Revolutionize Your Real Estate Management
          </h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto mb-8">
            masQani provides a comprehensive solution for property managers, 
            landlords, and tenants to streamline rental processes and property management.
          </p>
          <div className="flex justify-center space-x-4 mb-12">
            <Link
              to="/properties"
              className="bg-black text-white px-6 py-3 rounded-xl 
              hover:bg-neutral-700 transition-colors duration-300"
            >
              View Properties
            </Link>
            <Link
              to="/register"
              className="bg-neutral-100 text-black px-6 py-3 rounded-xl 
              hover:bg-neutral-300 transition-colors duration-300"
            >
              List Properties
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

      <div className="py-16 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            How masQani Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-2 rounded-full border shadow-soft border-neutral-900 mb-4 w-[10vw] h-[10vw] flex items-center justify-center">
                <span className="text-[5vw] font-bold text-black">1</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 underline mb-2">List Your Property</h3>
              <p className="text-neutral-800">
                Easily add your properties with detailed information and attractive listings.
              </p>
            </div>
            <div className="text-center">
              <div className="border border-neutral-900 p-3 rounded-full shadow-soft mb-4 w-[10vw] h-[10vw] flex items-center justify-center">
                <span className="text-[5vw] font-bold text-black">2</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 underline mb-2">Find Tenants</h3>
              <p className="text-neutral-800">
                Connect with verified tenants through our comprehensive matching system.
              </p>
            </div>
            <div className="text-center">
              <div className="border border-neutral-900 p-3 rounded-full shadow-soft mb-4 w-[10vw] h-[10vw] flex items-center justify-center">
                <span className="text-[5vw] font-bold text-black">3</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 underline mb-2">Manage Seamlessly</h3>
              <p className="text-neutral-800">
                Track payments, maintenance, and communications in one platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
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
