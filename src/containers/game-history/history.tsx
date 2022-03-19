import React from 'react';

interface IOwnProps {
  className?: string;
}

const GameHistory: React.FC<IOwnProps> = ({ className }) => {
  return (
    <div className={className}>
      GameHistory
    </div>
  );
};

export default GameHistory;
