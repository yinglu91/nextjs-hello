import { GetStaticProps } from 'next'
import path from 'path'
import fs from 'fs'

// exe on server 2
const Dynamic = (props) => {
  return (
    <div>
      <h1>Dynamic message: {props.message} </h1>
    </div>
  )
}

// exe on server 1
export const getStaticProps: GetStaticProps = async (context) => {
  const txt = fs.readFileSync(path.join(process.cwd(), 'public/robots.txt'), 'utf8')

  return {
    revalidate: 10,
    props: {
      message: txt
    }
  }
}

export default Dynamic
