import React, { useState } from 'react';
import RoughCard from '@/core/RoughCard';
import InputWithLabel from '@/core/InputWithLabel';
import SelectWithLabel from '@/core/SelectWithLabel';

type LinkInputProps = {
  index: number;
  onClick?: () => void;
}

const LinkInput = ({ index, onClick }: LinkInputProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  }
  return (
    <>
      <InputWithLabel name={`link-url-${index}`} label="URL" />
      <InputWithLabel name={`link-title-${index}`} label="Title (Headline, etc)" />
      <InputWithLabel name={`link-description-${index}`} label="Description" type="textarea" />
      <SelectWithLabel name={`link-type-${index}`} label="Link Type" options={[
        { value: 'internal', label: 'Internal' },
        { value: 'external', label: 'External' },
      ]} />
    </>
  )
}

export default LinkInput;
