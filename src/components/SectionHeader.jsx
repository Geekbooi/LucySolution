import PropTypes from 'prop-types'

export default function SectionHeader({ tag, title, subtitle, align = 'left', maxWidth = 'max-w-xl' }) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} ${maxWidth}`}>
      {tag && <div className="section-tag mb-4">{tag}</div>}
      <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[17px] text-white/50 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

SectionHeader.propTypes = {
  tag:      PropTypes.string,
  title:    PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  align:    PropTypes.oneOf(['left', 'center']),
  maxWidth: PropTypes.string,
}
