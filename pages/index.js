import Head from "next/head";
// import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import SectionCards from "../components/card/section-cards";
import { getPopularVideos, getVideos } from "../lib/videos";

export async function getServerSideProps() {
  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("productivity");
  const travelVideos = await getVideos("travel");
  const popularVideos = await getPopularVideos();
  // const travelVideos = await getVideos("travel");
  return {
    props: { disneyVideos, productivityVideos, travelVideos, popularVideos },
  };
}

export default function Home({
  disneyVideos,
  productivityVideos,
  travelVideos,
  popularVideos,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar username="ankita@ank.com" />
      <Banner
        videoId="4zH5iYM4wJo"
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.webp"
      />
      <div className={styles.sectionWrapper}>
        <SectionCards title="Disney" size="large" videos={disneyVideos} />
        <SectionCards
          title="Productivity"
          size="medium"
          videos={productivityVideos}
        />
        <SectionCards title="Travel" size="small" videos={travelVideos} />
        <SectionCards title="Popular" size="small" videos={popularVideos} />
      </div>
    </div>
  );
}
