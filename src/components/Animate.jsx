import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { motion, useInView } from 'framer-motion'

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

// ── Animated number counter ─────────────────────────────────────────────────
export function CountUp({ from = 0, to, duration = 2.2, suffix = '', prefix = '', className }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(from)

  useEffect(() => {
    if (!isInView) return
    const start = performance.now()
    const total = duration * 1000
    const tick = (now) => {
      const p = Math.min((now - start) / total, 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setDisplay(Math.floor(from + (to - from) * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, from, to, duration])

  return <span ref={ref} className={className}>{prefix}{display}{suffix}</span>
}
CountUp.propTypes = {
  from: PropTypes.number, to: PropTypes.number.isRequired,
  duration: PropTypes.number, suffix: PropTypes.string,
  prefix: PropTypes.string, className: PropTypes.string,
}

// ── Word-by-word blur reveal ────────────────────────────────────────────────
const wordFade = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  visible: (i) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.52, ease: EASE_OUT, delay: i * 0.07 },
  }),
}

export function RevealWords({ children, className }) {
  const words = String(children).split(' ')
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordFade} custom={i} className="inline-block mr-[0.22em] last:mr-0">
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}
RevealWords.propTypes = { children: PropTypes.node, className: PropTypes.string }

// ── Hover-lift card ─────────────────────────────────────────────────────────
export function FloatCard({ children, className }) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -10, scale: 1.015 }}
      transition={{ duration: 0.32, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}
FloatCard.propTypes = childProps
