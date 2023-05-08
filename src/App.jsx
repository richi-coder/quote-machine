import { useState } from 'react'

const APP_COLORS = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark']
const quotes = [
  {
    quote: 'Liberalismo al 100% es necesario en Venezuela!',
    author: 'richiCoder'
  },
  {
    quote: 'Saludos bolivarianos!',
    author: 'El Che'
  },
  {
    quote: 'Bolivar bolivar bolivar',
    author: 'Bolivar'
  }
]

function App() {
  const [colorApp, setColorApp] = useState('primary')
  const [quote, setQuote] = useState('Comenzando Quote!, Comenzando Quote!, Comenzando Quote!, Comenzando Quote!')
  const [author, setAuthor] = useState('Alguno')
  const [opacity, setOpacity] = useState('')

  function chooseColor() {
    const colorIndex = Math.abs(Math.ceil(Math.random() * APP_COLORS.length - 1));
    setColorApp(APP_COLORS[colorIndex])
  }

  function fetchQuote() {
    setOpacity('opacity-50')
    setTimeout(() => {
      const quoteIndex = Math.abs(Math.ceil(Math.random() * quotes.length - 1));
    setQuote(quotes[quoteIndex].quote)
    setAuthor(quotes[quoteIndex].author)
    chooseColor()
    }, 1000);
    setTimeout(() => {
      setOpacity('opacity-100')
    }, 2000);
  }

  return (
    <div className={`position-relative w-100 h-100 bg-${colorApp}`}>
      <div id='quote-box' className='card position-absolute top-50 start-50 translate-middle d-flex flex-column align-items-center justify-content-between w-50 h-50 py-5 px-4 text-center'>
        <div id='text' className={`text-${colorApp} h1 ${opacity}`} style={{transition: 'all 0.7s ease-in-out'}}>"{quote}"</div>
        <div id='author' className={`text-${colorApp} align-self-end`}>{author}</div>
        <div className='d-flex flex-row justify-content-between w-100 px-4'>
          <div className='d-flex flex-row align-self-start'>
            <a href="twitter.com/intent/tweet" id='tweet-quote' className={`bg-${colorApp} rounded px-3 py-2 display-5`}>
              <i className='fa fa-twitter text-light'></i>
            </a>
            <a href="twitter.com/intent/tweet" id='tweet-quote' className={`bg-${colorApp} rounded px-3 py-2 display-5`}>
              <i className='fa fa-tumblr text-light'></i>
            </a>
          </div>
            <button
            onClick={fetchQuote}
            id='new-quote'
            className={`align-self-end bg-${colorApp} border-0 rounded px-2 py-2 text-light`}>
              New Quote
            </button>
        </div>
      </div>
      <div className='position-absolute bottom-0 translate-middle-x start-50 text-warning'>by richiCoder</div>
    </div>
  )
}

export default App
