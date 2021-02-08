import { GetServerSideProps } from 'next'
import path from 'path'
import fs from 'fs'

// exe on server 2
const DynamicSSR = (props) => {
  return (
    <div>
      <h1>Dynamic message: {props.message} </h1>
    </div>
  )
}

// exe on server 1 always, every page request, even on production
// try to avoid to use it !!!!
export const getServerSideProps: GetServerSideProps = async (context) => {
  const txt = fs.readFileSync(path.join(process.cwd(), 'public/robots.txt'), 'utf8')

  return {
    props: {
      message: txt
    }
  }
}

export default DynamicSSR



