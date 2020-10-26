/* eslint-disable max-len */
import React from 'react';
import { render } from '@testing-library/react';
import { formatDate } from '@utils/format';
import NewsCard from '../NewsCard';

const article = {
  source: {
    id: null,
    name: 'Mingpao.com'
  },
  author: 'https://www.facebook.com/mingpaoinews',
  title: '新冠肺炎｜今增8宗確診全屬輸入個案不設疫情記者會',
  description: '【14:20更新】衛生署衛生防護中心公布，截至今（26日）零時零分，本港新增8宗新型冠狀病毒確診個案，新增個案全屬輸入個案，至今本港個案累計5304宗（包括5303宗確診個案和一宗疑似個案）。今日不會召開疫情記者會。',
  url: 'https://news.mingpao.com/ins/%e6%b8%af%e8%81%9e/article/20201026/s00001/1603687539899/%e6%96%b0%e5%86%a0%e8%82%ba%e7%82%8e-%e4%bb%8a%e5%a2%9e8%e5%ae%97%e7%a2%ba%e8%a8%ba%e5%85%a8%e5%b1%ac%e8%bc%b8%e5%85%a5%e5%80%8b%e6%a1%88-%e4%b8%8d%e8%a8%ad%e7%96%ab%e6%83%85%e8%a8%98%e8%80%85%e6%9c%83',
  urlToImage: 'https://fs.mingpao.com/ins/20201026/s00001/e4c8e468ceb2906db6f48a6f9820674c.jpg',
  publishedAt: '2020-10-26T06:42:04Z',
  content: '1452971024395302515303553044\r\n12:4926'
};

const articleWithLessDetails = {
  source: {
    id: 'google-news',
    name: 'Google News'
  },
  author: null,
  title: '超瓷晶面板4 倍耐摔網友實測核桃砸iPhone 12 Pro：結果悲劇',
  description: null,
  url: 'https://news.google.com/__i/rss/rd/articles/CBMipAFodHRwczovL25ld3MueGZhc3Rlc3QuY29tL2FwcGxlLzg2ODk0L3VsdHJhLWNlcmFtaWMtcGFuZWwtaXMtNC10aW1lcy1tb3JlLXJlc2lzdGFudC10by1mYWxsaW5nLW5ldGl6ZW5zLW1lYXN1cmVkLXdhbG51dHMtdG8taGl0LWlwaG9uZS0xMi1wcm8tdGhlLXJlc3VsdC1pcy10cmFnZWR5L9IBAA?oc=5',
  urlToImage: null,
  publishedAt: '2020-10-26T04:18:00Z',
  content: null
};

const newsArticle = (
  <NewsCard
    newsSource={article.source.name}
    newsDate={article.publishedAt}
    newsTitle={article.title}
    newsImage={article.urlToImage}
    newsDescription={article.description}
    newsUrl={article.url}
  />
);

const newsArticleWithLessDetails = (
  <NewsCard
    newsSource={articleWithLessDetails.source.name}
    newsDate={articleWithLessDetails.publishedAt}
    newsTitle={articleWithLessDetails.title}
    newsImage={articleWithLessDetails.urlToImage}
    newsDescription={articleWithLessDetails.description}
    newsUrl={articleWithLessDetails.url}
  />
);

describe('News Card', () => {
  it('renders correctly', () => {
    const { asFragment } = render(newsArticle);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should renders with link to full article', () => {
    const { container } = render(
      <NewsCard
        newsSource={article.source.name}
        newsDate={article.publishedAt}
        newsTitle={article.title}
        newsImage={article.urlToImage}
        newsDescription={article.description}
        newsUrl={article.url}
      />
    );
    const link = container.querySelector('.MuiCardActionArea-root');
    expect(link).toHaveAttribute('href', expect.stringMatching(article.url));
  });

  it('should renders with correct avatar', () => {
    const { container } = render(newsArticle);
    const avatarCircle = container.querySelector('.MuiAvatar-root');
    const avatarName = container.querySelector('.MuiCardHeader-title');
    expect(avatarCircle).toHaveTextContent(article.source.name[0]);
    expect(avatarName).toHaveTextContent(article.source.name);
  });

  it('should renders with correct publish date', () => {
    const { container } = render(newsArticle);
    const publishDate = container.querySelector('.MuiCardHeader-subheader');
    expect(publishDate).toHaveTextContent(formatDate(article.publishedAt));
  });

  it('should renders with correct preview image', () => {
    const { container } = render(newsArticle);
    const previewImage = container.querySelector('.MuiCardMedia-img');
    expect(previewImage).toHaveAttribute('src', expect.stringMatching(article.urlToImage));
    expect(previewImage).toHaveAttribute('title', expect.stringMatching(article.title));
  });

  it('should renders with correct article title', () => {
    const { container } = render(newsArticle);
    const articleTitle = container.querySelector('.MuiCardContent-root h2');
    expect(articleTitle).toHaveTextContent(article.title);
  });

  it('should renders with correct article deescription', () => {
    const { container } = render(newsArticle);
    const articleDescription = container.querySelector('.MuiCardContent-root p');
    expect(articleDescription).toHaveTextContent(article.description);
  });

  it('should not render preview image and description when they are not defined', () => {
    const { container } = render(newsArticleWithLessDetails);
    const previewImage = container.querySelector('.MuiCardMedia-img');
    const articleDescription = container.querySelector('.MuiCardContent-root p');
    expect(articleDescription).not.toBeInTheDocument();
    expect(previewImage).not.toBeInTheDocument();
  });
});
