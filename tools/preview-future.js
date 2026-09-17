// 예약(미래 날짜) 글까지 포함해 로컬 빌드하는 검증용 스크립트.
// _config.yml은 future: false(예약 발행)라 일반 `hexo generate`로는 미래 날짜 글이 public/에 안 생긴다.
// 사용법: node tools/preview-future.js   (hexo clean 후 실행 권장)
const Hexo = require('hexo');
const hexo = new Hexo(process.cwd(), {});
hexo.init()
  .then(() => { hexo.config.future = true; return hexo.call('generate', {}); })
  .then(() => hexo.exit())
  .catch(err => hexo.exit(err));
