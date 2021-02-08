import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPaths } from 'next';

// exec on server 2
const Fruit = ({num}) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  console.log(router)

  return (
    <div>
      <h1>hi fruit num: {num} </h1>
    </div>
  )
}

// exec on server 1
export const getStaticProps: GetStaticProps = async (context) => {
  return {
    revalidate: 10,
    props: {
      num: Math.random()
    }
  }
}

// getStaticProps runs at BUILD time, it does NOT run at RUNTIME

// http://localhost:3000/fruit/hello -> take the output -> store it on the disk
// http://localhost:3000/fruit/world -> take the output -> store it on the disk
// DONE

// http://localhost:3000/fruit/1  -> 404  due to 'fallback: false'
// http://localhost:3000/fruit/1  -> if 'fallback: true', 1st time, call the getStaticProps on server
// -> render the page -> (background) Next.js would add this to the paths list
// and would store it locally on the filesystem for faster access
// 2nd time etc, send the output from file stored

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { name: 'hello' } },
      { params: { name: 'world' } }
    ],
    fallback: false
  }
}

export default Fruit
