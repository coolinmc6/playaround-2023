"use client"

import React, { useRef, useState } from 'react';
import request from '@/app/lib/request';
import axios from 'axios';
import InputWithLabel from '@/core/InputWithLabel';
import RoughCard from '@/core/RoughCard';
import { addToast } from '@store/toast';
import Button from '@/core/Button';
import Chip from '@/core/Chip';
import ParagraphInput from '@/app/components/dev-tools/ParagraphInput';
import LinkInput from '@/app/components/dev-tools/LinkInput';
import { parseFormData } from '@/app/dev-tools/helpers';

type ShowLinksProps = {
  activeLink: number;
  array: number[];
  clickHandler: (num: number) => void;
}

const ShowLinks = ({ activeLink, array, clickHandler }: ShowLinksProps) => {
  return (
    <div className="p-2">
      {array.map((_num, index) => {
        const isActive = activeLink === index
        return isActive ? (
          <span className="p-2 m-1">{index + 1}</span>
        ) : (
          <Button onClick={() => clickHandler(_num)} rootClassName="m-2" variant="outlinePrimary">{index + 1}</Button>
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
  const loadData = async () => {
    axios({
      url: 'http://localhost:3000/api/get-data',
      method: 'get',
    }).then((res) => {
      console.log(res)
      const data = res.data;
      const paragraphs = data?.content?.map((item: any) => {
        return {
          ...item,
          links: data.citations.filter((citation: any) => citation['Paragraph ID'] === item.Id).map((citation: any) => {
            const linkId = citation['Link ID'];
            return data.links.find((link: any) => link.ID === linkId)
          })
        }
      })

      setContentData(paragraphs)
      console.log(paragraphs)
    })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log('Error', err.message);
        }
        console.log(err.config);
      
      })
  }

  const addLink = () => {
    const nextIndex = links.length;
    setLinks([...links, nextIndex])
    setActiveLink(nextIndex)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    
    const content = {
      title: form.get('content-title'),
      topic: form.get('content-topic'),
      subTopic: form.get('content-subtopic'),
      content1: form.get('content-content1'),
      content2: form.get('content-content2'),
    }

    const links = {
      title: form.get('link-title'),
      url: form.get('link-url'),
      description: form.get('link-description'),
    }

    const data = {
      content,
      links,
    }

    console.log(data)
    const data2 = parseFormData(form);
    console.log(data2)

    return;

    
    axios({
      url: 'http://localhost:3000/api/save-data',
      method: 'post',
      data,
    }).then((res) => {
      console.log(res)
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
    })
      .catch((err) => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
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
      <h1 className="text-3xl">Dev Tools Home</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="grid grid-cols-2">
          <ParagraphInput />
          <RoughCard title="Add Link">
            <h3 className="text-xl mb-2">Link #{links.length}</h3>
            {links.map((_num, index) => {
              return activeLink === index ?
                (
                  <div className="border border-gray-300 p-2 mb-2 rounded-md" >
                    <LinkInput index={links.length - 1} />
                  </div>
                ) : (
                  <div className="h-0 overflow-hidden opacity-100" >
                    <LinkInput index={index} />
                  </div>
                
                );
            }
            )}
            <ShowLinks activeLink={activeLink} array={links} clickHandler={setActiveLink} />
            <Button onClick={addLink}>Add Link</Button>
          </RoughCard>
          
        </div>
        <div className="text-right">
          <Button type="submit">Add Content</Button>
        </div>
      </form>
      <div>
        <Button onClick={loadData}>Load Data</Button>
        <h2 className="text-2xl mt-3">Content <Chip variant="primary">{contentData.length}</Chip></h2>
        <div className="grid grid-cols-2">
          {contentData.map((item: any) => {
            return (
              <RoughCard title={item.title} key={item.ID}>
                <div><strong>Title:</strong> {item.Title}</div>
                <div><strong>Topic:</strong> {item.Topic}</div>
                <div><strong>SubTitle:</strong> {item.SubTopic}</div>
                <div>{item.Content1}</div>
                <div>{item.Content2}</div>
                <div>
                  <strong>Links</strong><br />
                  {item.links.length ? item.links.map((link: any) => {
                    console.log(link)
                    return (
                      <div key={link?.ID}>
                        LINK
                      </div>
                    )
                  }) : null}
                </div>
              </RoughCard>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DevToolsHomePage;
