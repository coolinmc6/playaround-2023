import React from 'react';
import RoughCard from '@/core/RoughCard';
import InputWithLabel from '@/core/InputWithLabel';

const ParagraphInput = () => {
  return (
    <RoughCard title="Add Content">
      <InputWithLabel name="content-title" label="Title" />
      <InputWithLabel name="content-topic" label="Topic" />
      <InputWithLabel name="content-subtopic" label="Subtopic" />
      <InputWithLabel name="content-content1" label="Content1" type="textarea" />
      <InputWithLabel name="content-content2" label="Content2" type="textarea" />
    </RoughCard>
  )
}

export default ParagraphInput;
