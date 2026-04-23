import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const EASE_OUT = [0.16, 1, 0.3, 1]

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: EASE_OUT, delay },
  }),
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_OUT, delay },
  }),
}

const slideLeftVariants = {
  hidden: { opacity: 0, x: -36 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
}

const slideRightVariants = {
  hidden: { opacity: 0, x: 36 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
}

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
}

const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

const staggerItemVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
}

const VIEWPORT = { once: true, margin: '-55px' }

const childProps = {
  children:  PropTypes.node,
  className: PropTypes.string,
}

export function FadeUp({ children, className, delay = 0, ...props }) {
  return (
    <motion.div
      className={className}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      custom={delay}
      {...props}
    >
      {children}
    </motion.div>
  )
}
FadeUp.propTypes = { ...childProps, delay: PropTypes.number }

export function FadeIn({ children, className, delay = 0, ...props }) {
  return (
    <motion.div
      className={className}
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      custom={delay}
      {...props}
    >
      {children}
    </motion.div>
  )
}
FadeIn.propTypes = { ...childProps, delay: PropTypes.number }

export function SlideLeft({ children, className, ...props }) {
  return (
    <motion.div
      className={className}
      variants={slideLeftVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...props}
    >
      {children}
    </motion.div>
  )
}
SlideLeft.propTypes = childProps

export function SlideRight({ children, className, ...props }) {
  return (
    <motion.div
      className={className}
      variants={slideRightVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...props}
    >
      {children}
    </motion.div>
  )
}
SlideRight.propTypes = childProps

export function ScaleIn({ children, className, ...props }) {
  return (
    <motion.div
      className={className}
      variants={scaleInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...props}
    >
      {children}
    </motion.div>
  )
}
ScaleIn.propTypes = childProps

export function StaggerContainer({ children, className, ...props }) {
  return (
    <motion.div
      className={className}
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...props}
    >
      {children}
    </motion.div>
  )
}
StaggerContainer.propTypes = childProps

export function StaggerItem({ children, className, ...props }) {
  return (
    <motion.div
      className={className}
      variants={staggerItemVariants}
      {...props}
    >
      {children}
    </motion.div>
  )
}
StaggerItem.propTypes = childProps

export function PressScale({ children, className, scale = 0.97, ...props }) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale }}
      transition={{ duration: 0.15, ease: EASE_OUT }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
PressScale.propTypes = { ...childProps, scale: PropTypes.number }
