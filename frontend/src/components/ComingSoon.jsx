
import { motion } from 'framer-motion'


const ComingSoonPage = () => {

  return (
    <div className=" mt-12 bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col justify-center items-center p-4 h-[calc(100vh-128px)]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-white mb-8"
      >
        <h1 className="text-4xl tablet:text-6xl font-bold mb-4">Coming Soon</h1>
        <p className="text-xl tablet:text-2xl">
          Our revolutionary real estate SaaS platform is almost ready!
        </p>
      </motion.div>

    

    </div>
  )
}

export default ComingSoonPage

