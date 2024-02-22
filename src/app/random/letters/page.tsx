import TracingFont, { type FontType } from '@/app/components/TracingFont'
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

const letters = alphabet.map(letter => {
  return `${letter.toUpperCase()} ${letter}`
})

const fonts: FontType[] = [
  'Dashness',
  'KGPrimaryDots',
  'KGPrimaryDotsLined',
  'KGPrimaryDotsLinedAlt',
  'KGPrimaryDotsLinedAlt2',
]

const styleObjects = () => {
  return fonts.map((font) => {

    return {
      fontFamily: font,
      fontSize: '100px',
      wordSpacing: '-25px',
    }
  })
}

export default function Home () {

  return (
    <main>
      <h1 className="text-3xl font-bold pb-12 p-4">Letters</h1>
      <div className="p-4">
        <TracingFont font={fonts[2]}>
          Jillian Sophia Marlowe
        </TracingFont>
      </div>
      <div className="p-4">
        <TracingFont font={fonts[2]}>
          Thank you
        </TracingFont>
      </div>
      <div className="p-4">
        <TracingFont font={fonts[2]}>
          Jillian Elizabeth McNamara
        </TracingFont>
      </div>
      <div className="p-4">
        <TracingFont font={fonts[2]}>
          Casey Henderson
        </TracingFont>
      </div>
      <div className="p-4">
        <TracingFont font={fonts[2]}>
          Colin McNamara
        </TracingFont>
      </div>
      <div className="p-4">
        <TracingFont font={fonts[2]}>
          James Francis McNamara
        </TracingFont>
      </div>
      {/* <div className="p-4">
        {letters.map((string) => {
          return (
            <TracingFont font={fonts[2]} key={string}>
              {string}
            </TracingFont>
          )
        })}
      </div> */}
    </main>
  )
}
