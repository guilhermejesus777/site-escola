/**
 * Mascote do Colégio Kennedy de corpo inteiro.
 *
 * É um SVG inline (e não uma imagem) para que as animações de CSS
 * funcionem: flutuação, rabo abanando, piscar de olhos e joinha.
 * Só é exibido no tema do colégio.
 */
export function MascoteCepk({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 360 660"
      role="presentation"
      aria-hidden="true"
      className={`mascote-animado ${className}`}
    >
      <defs>
        <linearGradient id="pelo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c2ccd6" />
          <stop offset="0.55" stopColor="#a3afbc" />
          <stop offset="1" stopColor="#83909e" />
        </linearGradient>
        <linearGradient id="peloClaro" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e2e8ee" />
          <stop offset="1" stopColor="#c2ccd6" />
        </linearGradient>
        <linearGradient id="camisa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b211b" />
          <stop offset="1" stopColor="#0a0e0a" />
        </linearGradient>
        <linearGradient id="verde" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8bf033" />
          <stop offset="1" stopColor="#4fbb0d" />
        </linearGradient>
        <linearGradient id="calca" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#171d18" />
          <stop offset="1" stopColor="#080b08" />
        </linearGradient>
      </defs>

      {/* rabo */}
      <g className="mascote-rabo">
        <path
          d="M136 438c-32-8-64-2-88 18-16 14-18 36 2 42 18 6 36-6 52-20 12-10 22-16 34-17z"
          fill="url(#pelo)"
          stroke="#3c4650"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path d="M54 486c-8 6-11 14-7 20 6 8 20 4 30-6-6-6-14-11-23-14z" fill="#dde4ea" />
      </g>

      {/* pernas */}
      <path
        d="M137 452h42l-3 96-16 32h-20l-6-32z"
        fill="url(#pelo)"
        stroke="#3c4650"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M181 452h42l3 96-6 32h-20l-16-32z"
        fill="url(#pelo)"
        stroke="#3c4650"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* meias */}
      <path d="M140 540h36v40h-36z" fill="#f2f5f8" stroke="#3c4650" strokeWidth="4" />
      <path d="M184 540h36v40h-36z" fill="#f2f5f8" stroke="#3c4650" strokeWidth="4" />
      <path d="M142 556h32M184 556h32" stroke="#4fbb0d" strokeWidth="6" />

      {/* tênis */}
      <path
        d="M124 574h48c8 0 12 5 12 13v14c0 7-5 11-12 11h-52c-8 0-12-6-10-14l4-12c2-7 4-12 10-12z"
        fill="#131913"
        stroke="#3c4650"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M124 586h54" stroke="#8bf033" strokeWidth="5" strokeLinecap="round" />
      <path d="M120 600h64" stroke="#303a31" strokeWidth="7" strokeLinecap="round" />
      <path
        d="M188 574h48c6 0 8 5 10 12l4 12c2 8-2 14-10 14h-52c-7 0-12-4-12-11v-14c0-8 4-13 12-13z"
        fill="#131913"
        stroke="#3c4650"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M182 586h54" stroke="#8bf033" strokeWidth="5" strokeLinecap="round" />
      <path d="M176 600h64" stroke="#303a31" strokeWidth="7" strokeLinecap="round" />

      {/* shorts */}
      <path
        d="M116 388h128v62c0 12-8 18-20 18h-32l-12-30-12 30h-32c-12 0-20-6-20-18z"
        fill="url(#calca)"
        stroke="#3c4650"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M124 394h16v70h-16z" fill="url(#verde)" />
      <path d="M220 394h16v70h-16z" fill="url(#verde)" />
      <path d="M180 400v26" stroke="#3c4650" strokeWidth="4" strokeLinecap="round" />

      {/* pescoço */}
      <path d="M150 220h60v58h-60z" fill="url(#pelo)" stroke="#3c4650" strokeWidth="4" />

      {/* tronco / camisa */}
      <path
        d="M132 262h96c22 0 38 14 42 36l10 56c3 20-10 36-30 40l-60 7-60-7c-20-4-33-20-30-40l10-56c4-22 20-36 42-36z"
        fill="url(#camisa)"
        stroke="#3c4650"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* gola */}
      <path
        d="M158 262c6 10 13 15 22 15s16-5 22-15"
        fill="none"
        stroke="#4fbb0d"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* manga esquerda */}
      <path
        d="M134 268l-28 17c-12 7-17 20-13 33l9 30 34-12z"
        fill="url(#verde)"
        stroke="#3c8f0a"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* manga direita */}
      <path
        d="M226 268l28 17c12 7 17 20 13 33l-9 30-34-12z"
        fill="url(#verde)"
        stroke="#3c8f0a"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* dobras da camisa */}
      <path
        d="M142 372c12 6 26 9 38 9s26-3 38-9"
        fill="none"
        stroke="#2a332b"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M126 300c4 8 10 13 18 16M234 300c-4 8-10 13-18 16" stroke="#2a332b" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* escrita CEPK */}
      <text
        x="180"
        y="342"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="27"
        fontWeight="900"
        fill="url(#verde)"
        letterSpacing="1.2"
      >
        CEPK
      </text>
      <text
        x="180"
        y="359"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="8"
        fontWeight="700"
        fill="#9be86a"
        letterSpacing="1.4"
      >
        CORPO ESTUDANTIL
      </text>

      {/* braço direito, mão na cintura */}
      <path
        d="M260 294c17 7 28 21 32 40l9 48-31 7-14-52z"
        fill="url(#pelo)"
        stroke="#3c4650"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M268 382c13 1 22 7 24 15l-26 11-11-20z"
        fill="#c2ccd6"
        stroke="#3c4650"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M272 390l12-2M270 396l14-1" stroke="#7e8b98" strokeWidth="2.5" strokeLinecap="round" />

      {/* braço esquerdo com joinha (animado) */}
      <g className="mascote-joinha">
        <path
          d="M100 294c-15 7-25 20-28 36l-8 42 31 8 14-48z"
          fill="url(#pelo)"
          stroke="#3c4650"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M64 364c-4 16 0 28 11 33l12-22-9-25z"
          fill="#c2ccd6"
          stroke="#3c4650"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M66 278c-10 0-17 7-17 17v20c0 11 7 18 17 18s17-7 17-18v-8l8-4c6-3 7-11 1-15l-15-8c-2-1-5-2-8-2z"
          fill="#c2ccd6"
          stroke="#3c4650"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M70 268c4-10 15-12 19-4 3 7-1 14-8 17l-13-3z"
          fill="#c2ccd6"
          stroke="#3c4650"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path d="M63 288c6-3 13-2 17 2" stroke="#3c4650" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>

      {/* orelhas */}
      <path
        d="M126 92L108 26c-1-5 4-8 8-5l46 32z"
        fill="#9aa6b3"
        stroke="#3c4650"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M126 82l-11-40 30 21z" fill="#d6a8a8" />
      <path
        d="M234 92l18-66c1-5-4-8-8-5l-46 32z"
        fill="#9aa6b3"
        stroke="#3c4650"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M234 82l11-40-30 21z" fill="#d6a8a8" />

      {/* cabeça */}
      <path
        d="M108 132c0-40 30-66 72-66s72 26 72 66v30c0 16-4 28-12 38l-8 9c-8 24-27 39-52 39s-44-15-52-39l-8-9c-8-10-12-22-12-38z"
        fill="url(#pelo)"
        stroke="#3c4650"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* topo mais claro */}
      <path
        d="M118 132c2-30 26-48 62-48s60 18 62 48c-16-11-37-17-62-17s-46 6-62 17z"
        fill="#d4dce3"
        opacity=".75"
      />
      {/* tufos laterais */}
      <path
        d="M108 158l-16 10 18 4-12 12 16 2-8 14 16-6z"
        fill="#9aa6b3"
        stroke="#3c4650"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M252 158l16 10-18 4 12 12-16 2 8 14-16-6z"
        fill="#9aa6b3"
        stroke="#3c4650"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* focinho */}
      <ellipse cx="180" cy="198" rx="53" ry="40" fill="url(#peloClaro)" stroke="#3c4650" strokeWidth="4" />
      {/* manchas dos olhos */}
      <ellipse cx="142" cy="158" rx="22" ry="25" fill="#b7c2cd" opacity=".7" />
      <ellipse cx="218" cy="158" rx="22" ry="25" fill="#b7c2cd" opacity=".7" />
      {/* olhos (piscam) */}
      <g className="mascote-olhos">
        <ellipse cx="142" cy="156" rx="13" ry="15" fill="#ffffff" stroke="#3c4650" strokeWidth="3" />
        <ellipse cx="218" cy="156" rx="13" ry="15" fill="#ffffff" stroke="#3c4650" strokeWidth="3" />
        <circle cx="144" cy="158" r="7.5" fill="#0a0d0a" />
        <circle cx="216" cy="158" r="7.5" fill="#0a0d0a" />
        <circle cx="147" cy="154" r="2.6" fill="#ffffff" />
        <circle cx="219" cy="154" r="2.6" fill="#ffffff" />
      </g>
      {/* sobrancelhas */}
      <path d="M128 133c8-6 19-6 27-1" stroke="#3c4650" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M205 132c8-5 19-5 27 1" stroke="#3c4650" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      {/* nariz */}
      <ellipse cx="180" cy="188" rx="15" ry="11" fill="#0a0d0a" />
      <ellipse cx="175" cy="184" rx="4" ry="2.5" fill="#5c6874" />
      {/* boca */}
      <path
        d="M149 208c10 15 20 22 31 22s21-7 31-22"
        stroke="#0a0d0a"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M163 225c5 6 11 9 17 9s12-3 17-9"
        stroke="#c2555f"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="180" cy="230" rx="9" ry="5" fill="#c2555f" />
      {/* pelinhos */}
      <path d="M120 178l-9 7M118 192l-11 3M240 178l9 7M242 192l11 3" stroke="#7e8b98" strokeWidth="3" strokeLinecap="round" />

      {/* boné */}
      <path
        d="M111 100c0-35 27-57 69-57s69 22 69 57l-5 15c-18-12-40-18-64-18s-46 6-64 18z"
        fill="url(#verde)"
        stroke="#3c8f0a"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M98 104c10-4 22-6 35-7l4 14c-15 1-28 4-39 8z"
        fill="#4fbb0d"
        stroke="#3c8f0a"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M134 57c11-8 27-12 46-12s35 4 46 12c8 6 12 16 12 26 0 8-2 15-6 21-15-10-32-15-52-15s-37 5-52 15c-4-6-6-13-6-21 0-10 4-20 12-26z"
        fill="#f6f9fb"
        stroke="#d6dee6"
        strokeWidth="3"
      />
      <text
        x="180"
        y="86"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="25"
        fontWeight="900"
        fill="#2f9b12"
        letterSpacing="2"
      >
        CEPK
      </text>
      <text
        x="180"
        y="98"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="6.5"
        fontWeight="700"
        fill="#5c6874"
        letterSpacing=".7"
      >
        CORPO ESTUDANTIL
      </text>

      {/* confetes flutuando */}
      <g className="mascote-confete">
        <rect x="48" y="148" width="13" height="6" rx="3" fill="#7ee62a" opacity=".85" transform="rotate(-28 48 148)" />
        <rect x="298" y="118" width="13" height="6" rx="3" fill="#7ee62a" opacity=".85" transform="rotate(24 298 118)" />
        <rect x="40" y="322" width="11" height="5" rx="2.5" fill="#8bf033" opacity=".7" transform="rotate(18 40 322)" />
        <rect x="310" y="356" width="11" height="5" rx="2.5" fill="#8bf033" opacity=".7" transform="rotate(-16 310 356)" />
      </g>
    </svg>
  );
}
