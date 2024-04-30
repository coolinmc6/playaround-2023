"use client"

import React, { useRef, useState, useCallback } from 'react';
import request from '@/app/lib/request';
import axios from 'axios';
import InputWithLabel from '@/core/InputWithLabel';
import RoughCard from '@/core/RoughCard';
import { addToast } from '@store/toast';
import Button from '@/core/Button';
import Chip from '@/core/Chip';
import ParagraphInput from '@/app/components/dev-tools/ParagraphInput';
import LinkInput from '@/app/components/dev-tools/LinkInput';
import ContentDisplay from '@/app/components/dev-tools/DisplayContent';
import { parseFormData } from '@/app/dev-tools/helpers';
import { ParagraphType, CitationType, LinkType } from '@server/data/types';

type ShowLinksProps = {
  activeLink: number;
  array: number[];
  clickHandler: (num: number) => void;
}

const ShowLinks = ({ activeLink, array, clickHandler }: ShowLinksProps) => {
  if (array.length <= 1) return <div className="h-20" />;
  return (
    <div className="p-2 h-20">
      {array.map((_num, index) => {
        const isActive = activeLink === index
        return isActive ? (
          <span className="p-2 m-1">{index + 1}</span>
        ) : (
          <Button onClick={() => clickHandler(_num)} rootClassName="m-2" variant="outlinePrimary" key={index}>{index + 1}</Button>
        )
      })}
    </div>
  )
}



const DevToolsHomePage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [contentData, setContentData] = useState([])
  const [links, setLinks] = useState([0])
  const [activeLink, setActiveLink] = useState(0)
  const loadData = useCallback(async () => {
    axios({
      url: 'http://localhost:3000/api/get-data',
      method: 'get',
    }).then((res) => {
      const data = res.data;
      const paragraphs = data?.content?.map((item: ParagraphType) => {
        return {
          ...item,
          links: data.citations.filter((citation: CitationType) => citation['paragraph_id'] === item.id).map((citation: any) => {
            const linkId = citation['link_id'];
            return data.links.find((link: LinkType) => link.id === linkId)
          })
        }
      })

      setContentData(paragraphs)
    })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const addLink = () => {
    const nextIndex = links.length;
    setLinks([...links, nextIndex])
    setActiveLink(nextIndex)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    
    const data = parseFormData(form);
    
    axios({
      url: 'http://localhost:3000/api/save-data',
      method: 'post',
      data,
    }).then((res) => {
      addToast({
        message: 'Content added successfully',
        id: Math.random().toString(),
        open: true,
        severity: 'success',
      })
      loadData();
      if (formRef.current !== null) {
        // UNCOMMENT WHEN READY: Clear the form on submit
        // formRef.current.reset();
      }
      setLinks([0])
      setActiveLink(0)
    })
      .catch((err) => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
        } else if (err.request) {
          // The request was made but no response was received
          console.log(err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', err.message);
        }
        console.log(err.config);
      })
  }
  
  return (
    <div className="min-h-screen p-12">
      <h1 className="text-3xl">Add Content</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="grid grid-cols-2">
          <ParagraphInput />
          <RoughCard title="Add Link">
            <h3 className="text-xl mb-2">Link #{links.length}</h3>
            {links.map((_num, index) => {
              return activeLink === index ?
                (
                  <div className="border border-gray-300 p-2 mb-2 rounded-md" key={index} >
                    <LinkInput index={index} />
                  </div>
                ) : (
                  <div className="h-0 overflow-hidden opacity-100" key={index} >
                    <LinkInput index={index} />
                  </div>
                
                );
            }
            )}
            <ShowLinks activeLink={activeLink} array={links} clickHandler={setActiveLink} />
            <Button onClick={addLink} type="button">Add Link</Button>
          </RoughCard>
          
        </div>
        <div className="text-center pt-3">
          <Button type="submit" variant="success">Add Content</Button>
        </div>
      </form>
      <div>
        <Button onClick={loadData}>Load Data</Button>
        <h2 className="text-2xl mt-3">Content <Chip variant="primary">{contentData.length}</Chip></h2>
        <div className="grid grid-cols-2">
          {contentData.map((item: any) => {
            console.log(item)
            return (
              <ContentDisplay item={item} key={item.id} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DevToolsHomePage;
