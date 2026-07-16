export const logoURL="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAeuLioOK1ZSC8bQbffYbz1gZFxugAQdkx7UsMvqKDtFJLk3EWkpY-w8IBimYy_0xmg1aTzugh7JDHsGzv6hqIL9_qklFo-PFSH81MwCe9rokU4kGkdki.svg"
export const User_Avatar="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
export const API_OPTIONS={
  method: 'GET',
  headers: {accept: 'application/json', Authorization:'Bearer'+ process.env.REACT_APP_TMDB_KEY}
};
export const IMG_CDN="https://image.tmdb.org/t/p/w500"

export const BG_IMG="https://assets.nflxext.com/ffe/siteui/vlv3/2f42605e-e786-4a06-8612-ebc67c55ba6c/web/IN-en-20260629-TRIFECTA-perspective_76b17e8c-cff9-4c65-9938-08ca5029be6b_medium.jpg"

export const supportedLanguage=[{name:"English",identifier:"en"},{name:"Hindi",identifier:"hindi"},{name:"Spanish",identifier:"spanish"}]

export const OpenAI_GPT_Key=process.env.REACT_APP_OPENAI_KEY;
export const Gemnai_key=process.env.REACT_APP_GEMINIAI_KEY;
console.log(process.env.REACT_APP_GEMINIAI_KEY)