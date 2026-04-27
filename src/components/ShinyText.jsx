import PropTypes from 'prop-types'
import { useAnimationFrame, useMotionValue, useTransform, motion } from 'framer-motion'

ShinyText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  from: PropTypes.string,
  shine: PropTypes.string,
  speed: PropTypes.number,
}

export default function ShinyText({
  text,
  className = '',
  from = '#64CEFB',
  shine = '#ffffff',
  speed = 3000,
}) {
  const progress = useMotionValue(0)

  useAnimationFrame((t) => {
    progress.set((t / speed) % 1)
  })

  const backgroundPosition = useTransform(progress, [0, 1], ['300% 0%', '0% 0%'])

  return (
    <motion.span
      className={className}
      style={{
        backgroundImage: `linear-gradient(100deg, ${from} 25%, ${shine} 50%, ${from} 75%)`,
        backgroundSize: '300% 100%',
        backgroundPosition,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        display: 'inline-block',
      }}
    >
      {text}
    </motion.span>
  )
}
