import React from 'react';
import Button from '@/core/Button';

type ChildrenProps = {
  children: React.ReactNode;
  className?: string;
}

type MuiCardProps = ChildrenProps & {}

const MuiCard = ({ children, className }: MuiCardProps) => {
  React.useEffect(() => {
    console.log('MuiCard className:', className);
  }, [className])
  return (
    <div className={`bg-white shadow-xl rounded-md p-6 ${className}`}>
      {children}
    </div>
  );
}

export default MuiCard;

type HeaderProps = ChildrenProps

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={`mb-4 text-2xl text-center ${className}`}>
      {children}
    </div>
  );
}

const Content = ({ children, className }: ChildrenProps) => {
  return (
    <div className={`p-3 ${className}`}>
      {children}
    </div>
  );
}

type ActionAreaProps = ChildrenProps & {
  buttonText?: string;
  onClick?: () => void;
}

const ActionArea = ({ children, className, buttonText, onClick }: ActionAreaProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  }
  return (
    <div className={`p-3 text-center ${className}`}>
      {children}
      {buttonText ? (
        <div className={`p-3 text-center`}>
          <Button onClick={handleClick}>{buttonText}</Button>
        </div>) : null}
    </div>
  );
}


MuiCard.Header = Header;
MuiCard.Content = Content;
MuiCard.ActionArea = ActionArea;
