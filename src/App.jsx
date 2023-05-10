import { useEffect, useState } from 'react'

const APP_COLORS = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];

function App() {
  const [colorApp, setColorApp] = useState('dark')
  const [quoting, setQuoting] = useState({
    quote: 'Visit richicoder.com',
    author: 'richiCoder'
  })
  const [opacity, setOpacity] = useState('')
  const [data, setData] = useState([''])

  useEffect(() => {
    getQuotes()
  }, [])
  
  async function getQuotes() {
    // Fetching data once page loads and components mount
    const fetching = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    const dataQuotes = await fetching.json()

    // Save data to state to use it when clicking 'next quote'
    setData(dataQuotes.quotes)

    // Selecting a random quote to initialize the app
    const randomQuote = Math.abs(Math.ceil(Math.random() * dataQuotes.quotes.length - 1))
    setQuoting({
      quote: dataQuotes.quotes[randomQuote].quote,
      author: dataQuotes.quotes[randomQuote].author
    })

    // Selecting random color to initialize the app
    chooseColor()
  }

  function chooseColor() {
    const colorIndex = Math.abs(Math.ceil(Math.random() * APP_COLORS.length - 1));
    setColorApp(APP_COLORS[colorIndex])
  }

  function netxtQuote() {
    // Init animation
    setOpacity('transparency')
    // Look for another quote
    const quoteIndex = Math.abs(Math.ceil(Math.random() * data.length - 1));
    setTimeout(() => {
    // Set app data
    setQuoting({
      quote: data[quoteIndex].quote,
      author: data[quoteIndex].author,
    })
    // Choose another color
    chooseColor()
    // End animation
    
      setOpacity('')
    }, 500);
  }

  return (
    <div className={`position-relative w-100 h-100 bg-${colorApp}`} style={{transition: 'all 0.5s ease-in-out'}}>
      <div id='quote-box' className='card position-absolute top-50 start-50 translate-middle d-flex flex-column align-items-center justify-content-between w-auto h-auto py-5 px-4 text-center'>
        <div id='text' className={`text-${colorApp} display-5 ${opacity}`} style={{transition: 'all 0.5s ease-in-out'}}>"{quoting.quote}"</div>
        <div id='author' className={`text-${colorApp} align-self-end ${opacity}`} style={{transition: 'all 0.5s ease-in-out'}}>{quoting.author}</div>
        <div className='d-flex flex-row justify-content-between w-100 px-4'>
          <div className='d-flex flex-row align-self-start'>
            <a target='_blank' href={`https://twitter.com/intent/tweet?text=${quoting.quote} ${quoting.author}`} id='tweet-quote' className={`bg-${colorApp} rounded px-3 py-2 display-5`}  style={{transition: 'all 0.5s ease-in-out'}}>
              <i className='fa fa-twitter text-light'></i>
            </a>
            <a href="twitter.com/intent/tweet" id='tumblr-quote' className={`bg-${colorApp} rounded px-3 py-2 display-5`}  style={{transition: 'all 0.5s ease-in-out'}}>
              <i className='fa fa-tumblr text-light'></i>
            </a>
          </div>
            <button
            onClick={netxtQuote}
            id='new-quote'
            className={`align-self-end bg-${colorApp} border-0 rounded px-2 py-2 text-light`}
            style={{transition: 'all 0.5s ease-in-out'}}>
              New Quote
            </button>
        </div>
      </div>
    </div>
  )
}

export default App
