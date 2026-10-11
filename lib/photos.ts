export type PhotoCredit = { file: string; title: string; author: string; license: string; source: string }

const author = 'Huangdan2060'
const license = 'CC BY 3.0'
const base = 'https://commons.wikimedia.org/wiki/File:'

export const photoCredits: PhotoCredit[] = [
  { file: '/photos/loader-957.jpg', title: 'XGMA 957 Loader', author, license, source: `${base}XGMA_957_Loader_20210522.jpg` },
  {
    file: '/photos/loaders-lineup.jpg',
    title: 'Loaders, XGMA, 2021 Changsha International Construction Equipment Exhibition',
    author,
    license,
    source: `${base}Loaders,_XGMA,_2021_Changsha_International_Construction_Equipment_Exhibition.jpg`,
  },
  { file: '/photos/exhibition.jpg', title: 'Exhibition area of XGMA', author, license, source: `${base}Exhibition_area_of_XGMA_20210522.jpg` },
  { file: '/photos/excavator-822fl.jpg', title: 'XGMA 822FL Excavator', author, license, source: `${base}XGMA_822FL_Excavator_20210522.jpg` },
  { file: '/photos/excavator-815fl.jpg', title: 'XGMA 815FL Excavator', author, license, source: `${base}XGMA_815FL_Excavator_20210522.jpg` },
  { file: '/photos/roller-626mh.jpg', title: 'XGMA 626MH Road Roller', author, license, source: `${base}XGMA_626MH_Road_Roller_20210522.jpg` },
]
