import React from 'react';
import RoughCard from '@/core/RoughCard';
import InputWithLabel from '@/core/InputWithLabel';

const ParagraphInput = () => {
  return (
    <RoughCard title="Add Content" >
      <InputWithLabel name="title" label="Title" />
      <InputWithLabel name="topic" label="Topic" />
      <InputWithLabel name="subtopic" label="Subtopic" />
      <InputWithLabel name="content1" label="Content1" type="textarea" />
      <InputWithLabel name="content2" label="Content2" type="textarea" />
      <InputWithLabel name="content3" label="Content3" type="textarea" />
      <InputWithLabel name="content4" label="Content4" type="textarea" />
    </RoughCard>
  )
}

export default ParagraphInput;
