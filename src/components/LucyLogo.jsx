import PropTypes from 'prop-types'

LucyLogo.propTypes = {
  size:         PropTypes.number,
  showWordmark: PropTypes.bool,
  wordmarkSize: PropTypes.string,
}

export default function LucyLogo({ size = 32, showWordmark = true, wordmarkSize = 'text-[17px]' }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="lucyBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="lucyAccent" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Background tile */}
        <rect width="32" height="32" rx="9" fill="url(#lucyBg)" />

        {/* Subtle inner glow ring */}
        <rect width="32" height="32" rx="9" fill="none"
          stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

        {/* ── L mark ── */}
        {/* Vertical bar */}
        <rect x="8.5" y="7.5" width="5" height="17" rx="2.5" fill="white" />
        {/* Horizontal bar */}
        <rect x="8.5" y="19.5" width="15" height="5" rx="2.5" fill="white" />

        {/* Accent node — top right, suggests a "solution" spark / data point */}
        <circle cx="22.5" cy="9.5" r="3" fill="url(#lucyAccent)" />
        <circle cx="22.5" cy="9.5" r="1.4" fill="white" opacity="0.9" />

        {/* Connector line from L-corner to accent node */}
        <line
          x1="13.5" y1="12"
          x2="20"   y2="10.5"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>

      {showWordmark && (
        <span className={`font-extrabold ${wordmarkSize} tracking-tight text-white leading-none`}>
          Lucy Solution
        </span>
      )}
    </div>
  )
}
