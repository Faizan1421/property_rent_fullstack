import { Building, Users, Target, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const teamMembers = [
    { name: 'Jane Doe', role: 'CEO & Founder', image: 'https://loremfaces.net/256/id/1.jpg' },
    { name: 'John Smith', role: 'CTO', image: 'https://loremfaces.net/256/id/2.jpg' },
    { name: 'Alice Johnson', role: 'Head of Sales', image: 'https://loremfaces.net/256/id/5.jpg' },
    { name: 'Faizan Tayyab', role: 'Web Developer', image: 'https://loremfaces.net/256/id/3.jpg' },
  ]
  
  const AboutUsDetails = () => {
    return (
      <div className="mt-[48px]">
        {/* Hero Section */}
        <section className="relative  h-[50vh] laptop:h-[100vh]  overflow-hidden bg-gradient-to-br from-black  to-gray-800">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-start justify-center z-10"
          >
            <div className="text-center text-white  mt-[48px] tablet:mt-[100px] laptop:mt-[100px]">
              <h1 className="mb-4 leading-tight animate-text bg-gradient-to-r from-gray-500 via-white to-blue-500 bg-clip-text text-transparent  text-4xl tablet:text-6xl laptop:text-8xl font-extrabold text-center tracking-wide ">Redefining <br/> Real  Estate</h1>
              <p className="text-xl m-8 animate-text bg-gradient-to-r from-blue-500 via-white to-gray-500 bg-clip-text text-transparent">Innovative SaaS Solutions for the Modern Market</p>
              <motion.a
                href="#learn-more"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-2 bg-white text-blue-600 rounded-full text-lg font-semibold hover:bg-blue-50 transition duration-300"
              >
                Learn More
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
          <div className="absolute inset-0 opacity-60 ">
            <img
              src="https://res.cloudinary.com/dzxywksdm/image/upload/v1732791511/sean-pollock-PhYq704ffdA-unsplash_zttnvb.jpg"
              alt="Real Estate Background"
              className="w-full h-full object-cover"
            />
          </div>
        </section>
  
        {/* Company Overview */}
        <section id="learn-more" className="py-24 px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl px-5 tablet:px-0 tablet:text-3xl font-bold text-center mb-16">Transforming Real Estate Management</h2>
            <div className="grid tablet:grid-cols-3 gap-12">
              <motion.div whileHover={{ y: -10 }} className="text-center ">
                <Building className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                <h3 className=" font-semibold mb-4  px-5 tablet:px-0 text-xl tablet:text-2xl  ">Smart Property Management</h3>
                <p className="text-gray-600  px-5 tablet:px-0">Leverage AI-driven insights to optimize your property portfolio and maximize returns.</p>
              </motion.div>
              <motion.div whileHover={{ y: -10 }} className="text-center">
                <Users className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                <h3 className=" font-semibold mb-4  px-5 tablet:px-0 text-xl tablet:text-2xl  ">Seamless Client Experience</h3>
                <p className="text-gray-600  px-5 tablet:px-0">Delight your clients with intuitive interfaces and personalized property recommendations.</p>
              </motion.div>
              <motion.div whileHover={{ y: -10 }} className="text-center">
                <Target className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                <h3 className=" font-semibold mb-4  px-5 tablet:px-0 text-xl tablet:text-2xl  ">Data-Driven Decisions</h3>
                <p className="text-gray-600  px-5 tablet:px-0">Harness the power of advanced analytics to make informed, strategic choices.</p>
              </motion.div>
            </div>
          </motion.div>
        </section>
  
        {/* Team Section */}
        <section className=" px-4 ">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-16"
            >
              Meet Our Visionary Team
            </motion.h2>
            <div className="grid tablet:grid-cols-3 laptop:grid-cols-4 gap-16 tablet:gap-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="w-full h-ful object-cover l"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-medium">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Call to Action */}
        <section className="py-24 px-4  text-black ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Revolutionize Your Real Estate Business?</h2>
            <p className="text-lg mb-12">Join the ranks of industry leaders and experience the future of property management.</p>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full text-xl font-semibold hover:bg-blue-800 transition duration-300"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-6 h-6" />
            </motion.a>
          </motion.div>
        </section>
      </div>
    )
  }
  
  export default AboutUsDetails