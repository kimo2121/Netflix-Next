// import videoData from "../data/videos";

export const getCommonVideos = async (url) => {
  try {
    const BASE_URL = "youtube.googleapis.com/youtube/v3";

    const response = await fetch(
      `https://${BASE_URL}/${url}&maxResults=25&key=${process.env.YOUTUBE_API_KEY}`
    );
    const data = await response.json();

    if (data?.error) {
      console.log("Youtue API error", data.error);
      return [];
    }

    // console.log({ data });

    return data?.items.map((item) => {
      const id = item.id?.videoId || item.id;
      const snippet = item.snippet;
      return {
        title: snippet?.title,
        imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        id,
        description: snippet.description,
        publishTime: snippet.publishedAt,
        channelTitle: snippet.channelTitle,
        statistics: item.statistics ? item.statistics : { viewCount: 0 },
      };
    });
  } catch (error) {
    console.log("something went wrong", error);
    return [];
  }
};

export const getVideos = (searchQuery) => {
  const url = `search?part=snippet&q=${searchQuery}`;

  return getCommonVideos(url);
};
export const getPopularVideos = (searchQuery) => {
  const url = `videos?part=snippet%2CcontentDetails%2CStatistics&chart=mostPopular&${searchQuery}`;

  return getCommonVideos(url);
};
export const getYoutubeVideoById = (videoId) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;

  return getCommonVideos(URL);
};
