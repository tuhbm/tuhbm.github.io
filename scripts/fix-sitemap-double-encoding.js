'use strict';
// hexo-generator-seo-friendly-sitemap 이중 인코딩 보정
// 플러그인 템플릿이 이미 URL 인코딩된 permalink(한글 태그/카테고리)를 encodeURI로
// 한 번 더 인코딩해 %EA.. 가 %25EA.. 로 깨지고, 해당 URL이 전부 404가 되는 문제를
// 생성 직후 라우트 단계에서 되돌린다.
const SITEMAPS = [
  'sitemap.xml',
  'post-sitemap.xml',
  'page-sitemap.xml',
  'category-sitemap.xml',
  'tag-sitemap.xml'
];

hexo.extend.filter.register('after_generate', function () {
  const route = hexo.route;
  return Promise.all(
    SITEMAPS.filter((name) => route.get(name)).map(
      (name) =>
        new Promise((resolve, reject) => {
          let content = '';
          route
            .get(name)
            .on('data', (chunk) => {
              content += chunk;
            })
            .on('end', () => {
              route.set(name, content.replace(/%25([0-9A-Fa-f]{2})/g, '%$1'));
              resolve();
            })
            .on('error', reject);
        })
    )
  );
});
