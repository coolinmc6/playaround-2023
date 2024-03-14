export type ParagraphType = {
  id: string;
  active: boolean;
  type: string;
  title: string;
  credit: string;
  topic: string;
  subtopic: string;
  content1: string;
  content2: string;
  content3: string;
  content4: string;
  content5: string;
  content6: string;
  content7: string;
  content8: string;
  content9: string;
  content10: string;
}

export type CitationType = {
  id: string;
  text: string;
  link_id: string;
  paragraph_id: string;
  fact_id: string;
  comments: string;
}

export type LinkType = {
  id: string;
  text: string;
  type: string;
  a_href: string;
  a_target: string;
  a_title: string;
  description: string;
}
