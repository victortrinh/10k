import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import prisma from '../lib/prisma';
import AlexUrl from "../images/alex.png";
import HarriUrl from "../images/harri.png";
import Image from 'next/image'

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  
  return {
    props: { feed },
    revalidate: 10,
  };
}

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Home</h1>
        <main>
          <div className="image-container">
            <Image src={AlexUrl} alt="Alexander Pan" layout='fill' objectFit='contain' />
          </div>
          <div className="image-container">
            <Image className="hehe" src={HarriUrl} alt="Harrisson" layout='fill' objectFit='contain' />
          </div>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }

        .image-container {
          position: relative;
          width: 200px;
          height: 200px;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
