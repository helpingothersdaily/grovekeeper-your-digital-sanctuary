export type Substrate = 'google' | 'onedrive'
export type TendingLayer = 'observe' | 'consolidate' | 'release'

export interface DupFile {
  name: string
  date: string
  size: string
  substrate: Substrate
  seed: string
  canonical?: boolean
}

export interface DupGroup {
  id: string
  title: string
  files: DupFile[]
}

export const DUP_DATA: DupGroup[] = [
  {
    id: 'fl1',
    title: 'Lake photograph',
    files: [
      { name: 'IMG_4821.jpg',          date: 'Jun 2021', size: '3.2 MB', substrate: 'google',   seed: 'lake42',  canonical: true },
      { name: 'IMG_4821_copy.jpg',     date: 'Jun 2021', size: '3.2 MB', substrate: 'onedrive', seed: 'lake42' },
      { name: 'Summer photos (2).jpg', date: 'Aug 2021', size: '3.1 MB', substrate: 'google',   seed: 'lake43' },
    ]
  },
  {
    id: 'fl2',
    title: 'Project brief document',
    files: [
      { name: 'Brief_final.docx',        date: 'Mar 2023', size: '840 KB', substrate: 'google',   seed: 'doc1', canonical: true },
      { name: 'Brief_final_v2.docx',     date: 'Mar 2023', size: '842 KB', substrate: 'google',   seed: 'doc2' },
      { name: 'Brief_FINAL_FINAL.docx',  date: 'Apr 2023', size: '845 KB', substrate: 'onedrive', seed: 'doc3' },
      { name: 'Brief copy.docx',         date: 'Apr 2023', size: '840 KB', substrate: 'onedrive', seed: 'doc4' },
    ]
  },
  {
    id: 'fl3',
    title: 'Family dinner photo',
    files: [
      { name: 'DSC_0291.jpg',     date: 'Dec 2022', size: '5.1 MB', substrate: 'google',   seed: 'dinner1', canonical: true },
      { name: 'DSC_0291 (1).jpg', date: 'Dec 2022', size: '5.1 MB', substrate: 'onedrive', seed: 'dinner1' },
    ]
  },
  {
    id: 'fl4',
    title: 'Tax return 2022',
    files: [
      { name: 'Tax_2022.pdf',          date: 'Apr 2022', size: '210 KB', substrate: 'google',   seed: 'tax1', canonical: true },
      { name: 'Tax_2022_backup.pdf',   date: 'Apr 2022', size: '210 KB', substrate: 'onedrive', seed: 'tax1' },
      { name: 'Tax return - copy.pdf', date: 'May 2022', size: '210 KB', substrate: 'google',   seed: 'tax2' },
    ]
  },
]
