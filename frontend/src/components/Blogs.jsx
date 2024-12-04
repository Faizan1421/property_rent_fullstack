
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowRight, Calendar, User } from 'lucide-react'

const blogPosts = [
    {
      id: 1,
      title: 'The Future of Real Estate: AI and Machine Learning',
      excerpt: 'Discover how artificial intelligence is revolutionizing property valuation and market predictions.',
      author: 'Jane Doe',
      date: 'May 15, 2023',
      img: 'https://via.assets.so/game.png?id=1&q=95',
      category: 'Technology',
    },
    {
      id: 2,
      title: 'Sustainable Housing: Trends and Innovations',
      excerpt: 'Explore the latest eco-friendly building materials and energy-efficient designs shaping the future of housing.',
      author: 'John Smith',
      date: 'May 10, 2023',
      img: 'https://via.assets.so/game.png?id=11&q=95',
      category: 'Sustainability',
    },
    {
      id: 3,
      title: 'Navigating the Post-Pandemic Real Estate Market',
      excerpt: 'Expert insights on how COVID-19 has transformed buyer preferences and investment strategies.',
      author: 'Alice Johnson',
      date: 'May 5, 2023',
      img: 'https://via.assets.so/game.png?id=122&q=95',
      category: 'Market Trends',
    },
    {
      id: 4,
      title: 'Smart Home Technology: Boosting Property Value',
      excerpt: 'Learn how integrating smart home features can significantly increase the appeal and value of properties.',
      author: 'Michael Brown',
      date: 'April 30, 2023',
      img: 'https://via.assets.so/game.png?id=19&q=95',
      category: 'Technology',
    },
    {
      id: 5,
      title: 'Commercial Real Estate: Adapting to the New Normal',
      excerpt: 'Explore how commercial spaces are evolving to meet changing work patterns and business needs.',
      author: 'Sarah Lee',
      date: 'April 25, 2023',
      img: 'https://via.assets.so/game.png?id=15&q=95',
      category: 'Commercial',
    },
    {
      id: 6,
      title: 'Real Estate Investment Strategies for 2023',
      excerpt: 'Discover expert tips and emerging opportunities for maximizing your real estate investments this year.',
      author: 'David Wilson',
      date: 'April 20, 2023',
      img: 'https://via.assets.so/game.png?id=22&q=95',
      category: 'Investment',
    },
  ];
  

const categories = ['All', 'Technology', 'Sustainability', 'Market Trends', 'Commercial', 'Investment']

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || post.category === selectedCategory)
  )

  return (
    <div className=" min-h-screen mt-12">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl tablet:text-3xl laptop:text-5xl font-bold mb-6"
          >
            Real Estate Insights & Innovations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs tablet:text-lg laptop:text-xl mb-8"
          >
            Stay ahead of the curve with our expert analysis and industry updates
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-xl mx-auto relative"
          >
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Search articles"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600" aria-label="Search">
              <Search className="w-6 h-6" />
            </button>
          </motion.div>
        </div>
      </header>

      {/* Category Filter */}
      <section className="py-8 px-4 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid tablet:grid-cols-2 laptop:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
              >
                <img
                  src={post.img}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="text-blue-600 font-semibold text-sm mb-2 block">{post.category}</span>
                  <h2 className="text-xl font-bold mb-2 hover:text-blue-600 transition duration-300">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="flex items-center"><User className="w-4 h-4 mr-1" /> {post.author}</span>
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {post.date}</span>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <a href={`/blog/${post.id}`} className="text-blue-600 font-semibold flex items-center hover:underline">
                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gradient-to-r  text-black py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-xl tablet:text-2xl laptop:text-3xl font-bold mb-4">Stay Updated with Our Newsletter</h2>
          <p className="text-xs tablet:text-lg laptop:text-xl mb-8 px-16 tablet:px-44">Get the latest real estate insights delivered straight to your inbox.</p>
          <form className="flex flex-col tablet:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 tablet:w-96 shadow-md"
              aria-label="Email for newsletter"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-800 transition duration-300 shadow-md"
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </section>
    </div>
  )
}

export default Blogs

