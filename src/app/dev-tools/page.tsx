"use client"

import React, { useRef, useState } from 'react';
import request from '@/app/lib/request';
import axios from 'axios';
import InputWithLabel from '@/core/InputWithLabel';
import RoughCard from '@/core/RoughCard';
import { addToast } from '@store/toast';
import Button from '@/core/Button';
import Chip from '@/core/Chip';

const DevToolsHomePage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [contentData, setContentData] = useState([])

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
          <RoughCard title="Add Content">
            <InputWithLabel name="content-title" label="Title" />
            <InputWithLabel name="content-topic" label="Topic" />
            <InputWithLabel name="content-subtopic" label="Subtopic" />
            <InputWithLabel name="content-content1" label="Content1" type="textarea" />
            <InputWithLabel name="content-content2" label="Content2" type="textarea" />
          </RoughCard>
          <RoughCard title="Add Links">
            <InputWithLabel name="link-url" label="URL" />
            <InputWithLabel name="link-title" label="Title (Headline, etc)" />
            <InputWithLabel name="link-description" label="Description" type="textarea" />
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
