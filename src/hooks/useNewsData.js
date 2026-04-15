"use client";

import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

const useNewsData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${API_KEY}`,
        );

        const { data } = response;

        if (data.articles) {
          const newses = data.articles; 
          
          const finalNews = newses
            .filter((news) => {
              return (
                news.urlToImage &&
                news.urlToImage.length > 0 &&
                news.content &&
                news.content.length > 0
              );
            })
            .map((item) => ({
              title: item.title,
              source: item?.source?.name,
              time: moment(item?.publishedAt).format("DD MMM YYYY"),
              image: item?.urlToImage,
              url: item?.url
            }));
          setData(finalNews);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, loading };
};

export default useNewsData;
